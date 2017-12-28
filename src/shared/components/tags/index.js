import React, { Component } from "react";
import RPT from "prop-types";

import { Link } from "react-router";

import styles from "./style.sass";

export default class TagsFilter extends Component {
  static propTypes = {
    location: RPT.object
  };

  renderNestedTag = tag => {
    const { tags: { entities }, location } = this.props;

    if (typeof tag === "number") {
      const tagEntity = entities[tag];
      const link = {
        pathname: location.pathname,
        query: {
          tag,
          name: tagEntity.name
        }
      };
      const isActive = Number(location.query.tag) === tag;
      return (
        <Link to={link} key={tag} className={styles.tag}>
          <span
            className={`${styles.tagName} ${isActive ? styles.active : ""}`}
          >
            {tagEntity.name}
          </span>
        </Link>
      );
    } else {
      const tagEntity = entities[tag.tag];
      const link = {
        pathname: location.pathname,
        query: {
          tag: tagEntity.id,
          name: tagEntity.name
        }
      };
      const isActive = Number(location.query.tag) === tag.tag;
      return (
        <div key={tag.tag} className={`${styles.tag} ${styles.withNesting}`}>
          <Link
            to={link}
            className={`${styles.tagName} ${isActive ? styles.active : ""}`}
          >
            {tagEntity.name}
          </Link>
          <div className={styles.nested}>
            {tag.nested.map(this.renderNestedTag)}
          </div>
        </div>
      );
    }
  };

  render() {
    const { tags } = this.props;

    const tagsMarkup = tags.data.map(this.renderNestedTag);

    return <div className={styles.container}>{tagsMarkup}</div>;
  }
}
