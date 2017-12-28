/* global __SERVER__ */

import React, { Component, PropTypes } from "react";

// router declaration
import { browserHistory } from "react-router";

// mobx declaration
import { connect } from "react-redux";
import { actions, selectors } from "../../../shared/store/redux";

// components declaration
import PageFrame from "../page";
import MediaBanner from "../../components/media-banner";
import Loader from "../../components/loader";
import Sharing from "../../components/sharing";
import Disqus from "../../components/disqus";

// utils declaration
import { autobind } from "core-decorators";

const mapStateToProps = (state, { params }) => ({
  image: selectors.api.image(state, params)
});

const mapDispatchToProps = {
  fetchImages: actions.api.image
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MediaPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { params, fetchImages } = this.props;
    fetchImages(params);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeys);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeys);
  }

  @autobind
  handleKeys(e) {
    return 123;
    const { params: { id }, images } = this.props;
    const items = images.data || [];
    const index = items.findIndex(x => x.ID === id);
    const previous = items[index - 1];
    const next = items[index + 1];
    if (e.keyCode === 37 && previous) {
      browserHistory.push({
        pathname: `/media/${previous.ID}`,
        query: { type: previous.Type }
      });
    } else if (e.keyCode === 39 && next) {
      browserHistory.push({
        pathname: `/media/${next.ID}`,
        query: { type: next.Type }
      });
    }
  }

  getItem() {
    return;
    const { params: { id }, images } = this.props;
    const items = images.data || [];
    const index = items.findIndex(x => x.ID === id);
    const item = items[index];

    return item;
  }

  createMeta() {
    const item = this.getItem();

    if (item) {
      const url = `https://jess.gallery/media/${item.ID}?type=${item.Type}`;
      const image = item.BigURL.startsWith("//")
        ? `https:${item.BigURL}`
        : item.BigURL;
      const metaTitle = item.MetaTitle || item.Title;
      const metaDescription =
        item.MetaDescription ||
        item.Description ||
        "Jess Zaikova art, photos, travel, travel blog, my music and craft. Order paint!"; // eslint-disable-line
      const meta = {
        title: metaTitle,
        description: metaDescription,
        meta: {
          name: {
            keywords: item.Keywords
          },
          itemProp: {
            name: metaTitle,
            description: metaDescription,
            image: image
          },
          property: {
            "og:title": metaTitle,
            "og:url": url,
            "og:image": image,
            "og:image:type": "image/jpeg",
            "og:description": metaDescription,
            "twitter:card": "summary_large_image",
            "twitter:site": "@jesszaikova",
            "twitter:creator": "@jesszaikova",
            "twitter:url": url,
            "twitter:title": metaTitle,
            "twitter:description": metaDescription,
            "twitter:image": image
          }
        },
        auto: {
          ograph: true
        }
      };

      if (item.OriginalWidth && item.OriginalHeight) {
        meta.meta.property["og:image:width"] = 500;
        meta.meta.property["og:image:height"] =
          500 / (item.OriginalWidth / item.OriginalHeight);
      }

      return meta;
    }
  }

  renderItem() {
    const {
      params: { id },
      location: { pathname, search },
      image
    } = this.props;
    const item = image.data;
    // const index = items.findIndex(x => x.ID === id);
    // const item = items[index];
    // const previous = items[index - 1];
    // const next = items[index + 1];

    const url = `https://jess.gallery${pathname}${search}`;

    return item ? (
      <div>
        <MediaBanner
          item={image.data}
          sharing={<Sharing url={url} text={item.Title} />}
          comments={
            !__SERVER__ && (
              <Disqus id={`${image.type}/${id}`} url={url} title={item.title} />
            )
          }
        />
      </div>
    ) : (
      this.renderLoader()
    );
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    const { image } = this.props;

    const isLoading = image.isPending;
    const content = isLoading ? this.renderLoader() : this.renderItem();
    const meta = this.createMeta();

    return (
      <PageFrame small wide meta={meta}>
        {content}
      </PageFrame>
    );
  }
}
