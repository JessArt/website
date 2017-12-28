import React, { Component, PropTypes } from "react";

// redux declaration
import { connect } from "react-redux";
import { actions, selectors } from "../../../shared/store/redux";

// components declaration
import PageFrame from "../page";
import PromoSection from "../../components/promo-section";
import Loader from "../../components/loader";
import GridBanner from "../../components/grid-banner";
import Subscribe from "../../components/subscribe";

// style declaration
import styles from "./style.sass";

const mapStateToProps = state => {
  const photos = selectors.api.images(state, { type: "photo", pageSize: 50 });
  const art = selectors.api.images(state, { type: "art", pageSize: 50 });
  return {
    images: getData(photos).concat(getData(art)),
    isPending: photos.isPending || art.isPending
  };

  function getData(type) {
    return (type.data && type.data.data) || [];
  }
};

const mapDispatchToProps = {
  fetchImages: actions.api.images
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  static propTypes = {
    images: PropTypes.object
  };

  componentDidMount() {
    const { fetchImages } = this.props;
    fetchImages({ type: "art", pageSize: 50 });
    fetchImages({ type: "photo", pageSize: 50 });
  }

  render() {
    const { images, isPending } = this.props;
    const sections = ["art", "photo", "blog", "contact"].map((type, i) => {
      const EVEN_DIVIDER = 2;
      const EVEN_REMINDER = 0;
      const isEven = i % EVEN_DIVIDER === EVEN_REMINDER;
      const style = isEven ? "bright" : "dark";
      const position = isEven ? "left" : "right";
      return (
        <PromoSection
          key={type}
          type={type}
          style={style}
          position={position}
        />
      );
    });

    const metaTitle = "Jess Zaikova Gallery";
    const metaDescription =
      "Jess Zaikova art, photography, travel blog, my music and craft. Write to order prints!";
    const metaImage = "https://static.jess.gallery/site_og.jpg";

    const meta = {
      title: metaTitle,
      description: metaDescription,
      canonical: "https://jess.gallery",
      meta: {
        charset: "utf-8",
        name: {
          keywords:
            "jess zaikova, art, portrait drawing, drawing, photography, travel blog, nature photos"
        },
        itemProp: {
          name: metaTitle,
          description: metaDescription,
          image: metaImage
        },
        property: {
          "og:title": metaTitle,
          "og:url": "https://jess.gallery",
          "og:image": metaImage,
          "og:image:type": "image/jpeg",
          "og:description": metaDescription,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery",
          "twitter:title": metaTitle,
          "twitter:description": metaDescription,
          "twitter:image": metaImage
        }
      }
    };

    const banner =
      isPending || images.length === 0 ? (
        <Loader />
      ) : (
        <GridBanner items={images} />
      );

    return (
      <PageFrame small meta={meta}>
        <div className={styles.container}>
          {banner}
          <div className={styles.sectionsContainer}>{sections}</div>
          <Subscribe />
        </div>
      </PageFrame>
    );
  }
}
