import React, { Component } from "react";

import { connect } from "react-redux";
import { actions, selectors } from "../../../shared/store/redux";

// components declaration
import PageFrame from "../page";
import Loader from "../../components/loader";
import BigGrid from "../../layouts/big-grid";

import playIcon from "./play.png";

import styles from "./style.sass";

const mapStateToProps = state => ({
  stories: selectors.api.tumblr(state)
});

const mapDispatchToProps = {
  fetchStories: actions.api.tumblr
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StoriesPage extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }

  renderStories(stories) {
    const storiesMarkup = stories.map(story => {
      console.log(story);
      if (story.type === "video") {
        return (
          <a
            key={story.id}
            className={styles.link}
            href={story.permalink_url}
            target={"_blank"}
          >
            <img className={styles.image} src={story.thumbnail_url} />
            <div className={styles.iconWrapper}>
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${playIcon})` }}
              />
            </div>
            <div className={styles.summary}>{story.summary}</div>
          </a>
        );
      } else if (story.type === "photo" && story.photos.length) {
        const photo = story.photos[0];
        return (
          <a
            key={story.id}
            className={styles.link}
            href={story.link_url}
            target={"_blank"}
          >
            <img className={styles.image} src={photo.original_size.url} />
            <div className={styles.summary}>{story.summary}</div>
          </a>
        );
      }
    });

    return <div className={styles.container}>{storiesMarkup}</div>;
  }

  createMeta() {
    const title = "Photo Topics with Commentaries";
    const description =
      "Cities around the world; cemeteries; churches; and anything else that catches my attention";
    const image =
      "https://static.jess.gallery/cb514eed-a199-424a-ae06-9e6ee832c670_1200.jpg";
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords:
            "jess zaikova, blog, photography, cities, churches, cemeteries, travel, culture"
        },
        itemProp: {
          name: title,
          description,
          image
        },
        property: {
          "og:title": title,
          "og:url": "https://jess.gallery/collections",
          "og:image": image,
          "og:image:type": "image/jpeg",
          "og:description": description,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery/collections",
          "twitter:title": title,
          "twitter:description": description,
          "twitter:image": image
        }
      },
      auto: {
        ograph: true
      }
    };

    return meta;
  }

  render() {
    const { stories } = this.props;
    const isLoading = stories.isPending;
    const storiesData =
      (stories.data && stories.data.response && stories.data.response.posts) ||
      [];
    const meta = this.createMeta();
    return (
      <PageFrame wide meta={meta}>
        {isLoading && <Loader />}
        {!isLoading && this.renderStories(storiesData)}
      </PageFrame>
    );
  }
}
