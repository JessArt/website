import React, { Component } from "react";
import RPT from "prop-types";

// redux declaration
import { connect } from "react-redux";
import { actions, selectors } from "../../../shared/store/redux";

// components declaration
import PageFrame from "../page";
import Loader from "../../components/loader";
import Button from "../../components/button";
import Grid from "../../components/grid";
import Media from "../../components/media";
import Subscribe from "../../components/subscribe";
import Tags from "../../components/tags";

export default function createPaginablePage({ type, createMeta }) {
  class PaginablePage extends Component {
    state = {
      page: 0
    };

    reset = () => this.setState({ page: 0 });

    nextPage = () => this.setState({ page: this.state.page + 1 });

    render() {
      return (
        <PaginablePageWithPaging
          {...this.props}
          page={this.state.page}
          reset={this.reset}
          nextPage={this.nextPage}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    const tagFromQuery = props.location.query.tag;
    const tags = tagFromQuery ? [tagFromQuery] : undefined;

    const allPages = [...new Array(props.page + 1)].map((_, i) =>
      selectors.api.images(state, { type, tags, pageNumber: i })
    );

    const foldedData = allPages.reduce((hash, data) => {
      let newData;

      if (!hash.data) {
        newData = data.data;
      } else if (!data.data) {
        newData = hash.data;
      } else {
        newData = {
          data: hash.data.data.concat(data.data.data),
          meta: {
            total: hash.data.meta.total,
            elements: hash.data.meta.elements + data.data.meta.elements,
            offset: data.data.meta.offset,
            page_size: data.data.meta.page_size
          }
        };
      }

      return {
        error: hash.error || data.error,
        isPending: hash.isPending || data.isPending,
        data: newData
      };
    }, {});

    return {
      images: foldedData,
      topTags: selectors.api.topTags(state, { type })
    };
  };

  const mapDispatchToProps = {
    fetchImages: actions.api.images,
    fetchTags: actions.api.topTags
  };

  @connect(mapStateToProps, mapDispatchToProps)
  class PaginablePageWithPaging extends Component {
    static propTypes = {
      images: RPT.object,
      topTags: RPT.object,

      fetchImages: RPT.func,
      fetchTags: RPT.func
    };

    static defaultProps = {
      page: 0
    };

    componentWillMount() {
      this.fetchImages();
      this.props.fetchTags({ type });
    }

    componentWillReceiveProps(props) {
      if (
        props.location.query.tag !== this.props.location.query.tag &&
        props.page !== 0
      ) {
        this.props.reset();
      } else {
        this.fetchImages(props);
      }
    }

    fetchImages(props = this.props) {
      const { location: { query }, page } = props;
      props.fetchImages({
        type,
        tags: query.tag ? [query.tag] : undefined,
        pageNumber: page
      });
    }

    createMeta() {
      return createMeta();
    }

    loadMore = () => {
      this.props.nextPage();
    };

    render() {
      const { images, location, topTags } = this.props;

      const elements = ((images.data && images.data.data) || []).map(x => (
        <Media key={x.id} item={x} />
      ));

      const shouldShowLoadButton =
        !images.isPending &&
        images.data &&
        images.data.meta &&
        images.data.meta.elements !== images.data.meta.total;

      const content = (
        <div>
          <Grid>{elements}</Grid>
          {shouldShowLoadButton && (
            <Button
              style={{ width: "350px", margin: "100px auto 50px" }}
              onClick={this.loadMore}
            >
              {"Load more"}
            </Button>
          )}
          {images.isPending && <Loader />}
          <Subscribe />
        </div>
      );

      const meta = this.createMeta();

      return (
        <PageFrame small meta={meta}>
          {topTags.data && <Tags tags={topTags.data} location={location} />}
          {content}
        </PageFrame>
      );
    }
  }

  return PaginablePage;
}
