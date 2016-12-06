import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Subscribe from '../../components/subscribe'

// utils declaration
import { autobind } from 'core-decorators'
import { chunk } from 'lodash'

// style declaration
import './style.css'
import styles from './style.css.json'

@observer(['articles'])
export default class ArticlesPage extends Component {
  static willRender(stores) {
    return stores.articles.fetchArticles()
  }

  componentDidMount() {
    this.props.articles.fetchArticles()
  }

  createMeta() {
    const title = 'Jess\' Zaikova Travel Articles'
    const description = 'Travel articles of Jess Zaikova around the world. USA, Russia, Czech, Prague, Serbia and much more!'
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'jess zaikova, travel, blog, articles, russia, prague, czech republic, USA, travel blog'
        },
        itemProp: {
          name: title,
          description,
          image: 'https://static.jess.gallery/photo_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': 'https://jess.gallery/travel',
          'og:image': 'https://static.jess.gallery/photo_og.jpg',
          'og:image:type': 'image/jpeg',
          'og:description': description,
          'twitter:card': 'summary_large_image',
          'twitter:site': '@jessellisart',
          'twitter:creator': '@jessellisart',
          'twitter:url': 'https://jess.gallery/travel',
          'twitter:title': title,
          'twitter:description': description,
          'twitter:image': 'https://static.jess.gallery/photo_og.jpg'
        }
      },
      auto: {
        ograph: true
      }
    }

    return meta
  }

  @autobind
  renderArticles(articles) {
    if (articles.length) {
      return (
        <div className={styles.grid}>
          <div className={styles.lead}>
            {this.renderArticle(articles[0])}
          </div>
          <div className={styles.otherContainer}>
            {articles.map((article, i) => {
              return (
                <div className={`${styles.otherElement} ${i === 0 ? styles.first : ''}`}>
                  {this.renderArticle(article)}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  @autobind
  renderArticle(article) {
    return (
      <div className={styles.article} key={article.ID}>
        <div className={styles.image} style={{ backgroundImage: `url(${article.Cover})` }} />
        <Link
          to={{ pathname: `/travel/${article.ID}` }}
          className={styles.articleLink}>
          <div className={styles.articleContent}>
            <h2 className={styles.title}>
              {article.Title}
            </h2>
            <h4 className={styles.subtitle}>
              {article.Subtitle}
            </h4>
          </div>
        </Link>
      </div>
    )
  }

  render() {
    const { articles: { data: { loading, articles } } } = this.props
    const meta = this.createMeta()
    return (
      <PageFrame small meta={meta}>
        <div className={`container ${styles.container}`} style={{ background: '#fff' }}>
          <div className={styles.content}>
            {loading && <Loader />}
            {!loading && articles && chunk(articles, 5).map(this.renderArticles)}
          </div>
          <div className={styles.subscribe}>
            <Subscribe />
          </div>
        </div>
      </PageFrame>
    )
  }
}
