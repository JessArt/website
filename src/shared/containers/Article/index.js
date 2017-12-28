/* global __SERVER__ */

import React, { Component } from "react";

// redux declaration
import { connect } from "react-redux";
import { actions, selectors } from "../../../shared/store/redux";

// components declaration
import { Link } from "react-router";
import PageFrame from "../page";
import Loader from "../../components/loader";
import Article from "./article";
import Disqus from "../../components/disqus";
import Sharing from "../../components/sharing";

// utils declaration
import { articleLink } from "../../utils/links";

// styles declaration
import styles from "./style.sass";

const mapStateToProps = state => ({
  articles: selectors.api.articles(state)
});

const mapDispatchToProps = {
  fetchArticles: actions.api.articles
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ArticlePage extends Component {
  componentWillMount() {
    this.props.fetchArticles();
  }

  createMeta(article) {
    if (article) {
      const url = `https://jess.gallery/travel/${article.id}`;
      const image = article.cover || "https://static.jess.gallery/photo_og.jpg";
      const description =
        article.description ||
        "Travel articles of Jess Zaikova around the world. USA, Russia, Czech, Prague, Serbia and much more!"; // eslint-disable-line
      const meta = {
        title: article.title,
        description: description,
        meta: {
          name: {
            keywords: article.keywords
          },
          itemProp: {
            name: article.title,
            description: description,
            image
          },
          property: {
            "og:title": article.title,
            "og:url": url,
            "og:image": image,
            "og:image:type": "image/jpeg",
            "og:description": description,
            "twitter:card": "summary_large_image",
            "twitter:site": "@jesszaikova",
            "twitter:creator": "@jesszaikova",
            "twitter:url": url,
            "twitter:title": article.title,
            "twitter:description": description,
            "twitter:image": image
          }
        },
        auto: {
          ograph: true
        }
      };

      return meta;
    } else {
      const title = "Jess' Zaikova Travel Articles";
      const description =
        "Travel articles of Jess Zaikova around the world. USA, Russia, Czech, Prague, Serbia and much more!";
      const meta = {
        title,
        description,
        meta: {
          name: {
            keywords:
              "jess zaikova, travel, blog, articles, russia, czech, prague, USA, travel blog"
          },
          itemProp: {
            name: title,
            description,
            image: "https://static.jess.gallery/photo_og.jpg"
          },
          property: {
            "og:title": title,
            "og:url": "https://jess.gallery/travel",
            "og:image": "https://static.jess.gallery/photo_og.jpg",
            "og:image:type": "image/jpeg",
            "og:description": description,
            "twitter:card": "summary_large_image",
            "twitter:site": "@jesszaikova",
            "twitter:url": "https://jess.gallery/travel",
            "twitter:title": title,
            "twitter:description": description,
            "twitter:image": "https://static.jess.gallery/photo_og.jpg"
          }
        },
        auto: {
          ograph: true
        }
      };

      return meta;
    }
  }

  renderArticle(article) {
    if (article) {
      const { location: { pathname, search } } = this.props;
      const url = `https://jess.gallery${pathname}${search}`;

      return (
        <div key={article.id}>
          <div
            style={{ backgroundImage: `url(${article.cover})` }}
            className={styles.background}
          >
            <div className={styles.article}>
              <h2 className={styles.title}>{article.title}</h2>
              <h4 className={styles.subtitle}>{article.subtitle}</h4>
              <div className={styles.sharing}>
                <Sharing url={url} text={article.title} />
              </div>
            </div>
          </div>
          <div className={styles.article}>
            <Article text={article.text} />
            <div className={styles.comments}>
              {!__SERVER__ && (
                <Disqus
                  id={`travel/${article.id}`}
                  url={url}
                  title={article.title}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  getTitle(article) {
    if (article) {
      return article.title;
    }
  }

  renderHeader({ prev, next }) {
    const prevLink = articleLink(prev);
    const nextLink = articleLink(next);
    return (
      <div className={styles.header}>
        <Link
          to={prevLink}
          className={`${styles.headerLink} ${styles.headerTitle} ${
            prev ? "" : styles.invisible
          }`}
        >
          {"Previous: "}
          {this.getTitle(prev)}
        </Link>
        <Link to={"/travel"} className={styles.headerLink}>
          {"Back to the articles"}
        </Link>
        <Link
          to={nextLink}
          className={`${styles.headerLink} ${styles.headerTitle} ${
            next ? "" : styles.invisible
          }`}
        >
          {"Next: "}
          {this.getTitle(next)}
        </Link>
      </div>
    );
  }

  render() {
    const {
      articles: { isPending: loading, data },
      params: { id }
    } = this.props;

    const articles = data && data.data;

    let index;
    const article =
      !loading &&
      articles &&
      articles.length !== 0 &&
      articles.find(({ id: articleId }, i) => {
        const found = articleId === Number(id);

        if (found) {
          index = i;
        }

        return found;
      });

    const prevArticle = articles && articles[index + 1];
    const nextArticle = articles && articles[index - 1];
    const meta = this.createMeta(article);

    const headerMarkup =
      articles && this.renderHeader({ prev: prevArticle, next: nextArticle });
    return (
      <PageFrame small meta={meta} header={headerMarkup}>
        <div className="container" style={{ background: "#fff" }}>
          {loading && <Loader />}
          {!loading && articles && this.renderArticle(article)}
        </div>
      </PageFrame>
    );
  }
}
