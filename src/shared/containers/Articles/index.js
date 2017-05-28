import React, { Component } from 'react'

// redux declaration
import { connect } from 'react-redux'
import { actions, selectors } from '../../../shared/store/redux'

import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Subscribe from '../../components/subscribe'

// utils declaration
import { autobind } from 'core-decorators'
import { chunk } from 'lodash'

// style declaration

import styles from './style.sass'

const mapStateToProps = state => ({
  articles: selectors.api.articles(state)
})

const mapDispatchToProps = {
  fetchArticles: actions.api.articles
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ArticlesPage extends Component {
  componentWillMount() {
    this.props.fetchArticles()
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
          'twitter:site': '@jesszaikova',
          'twitter:creator': '@jesszaikova',
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
  renderArticles(articles, i) {
    if (articles.length) {
      const isEven = i % 2 === 1
      return (
        <div key={`chunk_${i}`} className={`${styles.grid} ${isEven ? styles.even : ''}`}>
          <div className={styles.lead}>
            {this.renderArticle(articles[0])}
          </div>
          <div className={styles.otherContainer}>
            {articles.map((article, i) => {
              return (
                <div key={article.ID}
                     className={`
                       ${styles.otherElement} ${i === 0 ? styles.first : ''}
                       ${isEven ? styles.even: ''}
                    `}>
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
    const { articles: { isPending: loading, data: articles } } = this.props
    const meta = this.createMeta()
    return (
      <PageFrame small meta={meta}>
        <div className={`container ${styles.container}`} style={{ background: '#fff' }}>
          <div className={styles.content}>
            <div>
              <h1 className={styles.pageTitle}>
                {'My adventures'}
              </h1>
              <div className={styles.description}>
                {'Here\'s a place for me to document places I\'ve been; things I\'ve seen; and lessons I\'ve learned. There is no rhyme, reason, or order, so just find a picture that you fancy and give it a click! Dive in to the wormhole.'}
              </div>
            </div>
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
