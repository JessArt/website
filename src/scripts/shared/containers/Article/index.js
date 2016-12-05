/* global __SERVER__ */

import React, { Component } from 'react'

import { observer } from 'mobx-react'

// components declaration
import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Article from './article'
import Disqus from '../../components/disqus'
import Sharing from '../../components/sharing'

// utils declaration
import { articleLink } from '../../utils/links'

// styles declaration
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

  createMeta(article) {
    if (article) {
      const url = `https://jess.gallery/travel/${article.ID}`
      const image = 'https://static.jess.gallery/photo_og.jpg'
      const meta = {
        title: article.Title,
        description: article.Description,
        meta: {
          name: {
            keywords: article.Keywords
          },
          itemProp: {
            name: article.Title,
            description: article.Description,
            image
          },
          property: {
            'og:title': article.Title,
            'og:url': url,
            'og:image': image,
            'og:image:type': 'image/jpeg',
            'og:description': article.Description,
            'twitter:card': 'summary_large_image',
            'twitter:site': '@jessellisart',
            'twitter:url': url,
            'twitter:title': article.Title,
            'twitter:description': article.Description,
            'twitter:image': image
          }
        },
        auto: {
          ograph: true
        }
      }

      return meta
    } else {
      const title = 'Jess\' Zaikova Travel Articles'
      const description = 'Travel articles of Jess Zaikova around the world. USA, Russia, Czech, Prague, Serbia and much more!'
      const meta = {
        title,
        description,
        meta: {
          name: {
            keywords: 'jess zaikova, travel, blog, articles, russia, czech, prague, USA, travel blog'
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
  }

  renderArticle(article) {
    const { location: { pathname, search } } = this.props
    const url = `https://jess.gallery${pathname}${search}`

    return (
      <div className={styles.article} key={article.ID}>
        <div className={styles.sharing}>
          <Sharing url={url} text={article.Title} />
        </div>
        <h2 className={styles.title}>
          {article.Title}
        </h2>
        <h4 className={styles.subtitle}>
          {article.Subtitle}
        </h4>
        <Article text={article.Text} />
        <div className={styles.comments}>
          {!__SERVER__ && <Disqus id={`travel/${article.ID}`} url={url} title={article.Title} />}
        </div>
      </div>
    )
  }

  getTitle(article) {
    if (article) {
      return article.Title
      // return article.Title.split(' ').slice(0, 3).join(' ') + '...' // eslint-disable-line
    }
  }

  renderHeader({ prev, next }) {
    const prevLink = articleLink(prev)
    const nextLink = articleLink(next)
    return (
      <div className={styles.header}>
        <Link to={prevLink} className={`${styles.headerLink} ${styles.headerTitle} ${prev ? '' : styles.invisible}`}>
          {'Previous: '}
          {this.getTitle(prev)}
        </Link>
        <Link to={'/travel'} className={styles.headerLink}>
          {'Back to the articles'}
        </Link>
        <Link to={nextLink} className={`${styles.headerLink} ${styles.headerTitle} ${next ? '' : styles.invisible}`}>
          {'Next: '}
          {this.getTitle(next)}
        </Link>
      </div>
    )
  }

  render() {
    const { articles: { data: { loading, articles } }, params: { id } } = this.props

    let index
    const article = !loading && articles && articles.length !== 0 && articles.find(({ ID }, i) => {
      const found = ID === id

      if (found) {
        index = i
      }

      return found
    })

    const prevArticle = articles[index - 1]
    const nextArticle = articles[index + 1]
    const meta = this.createMeta(article)

    const headerMarkup = this.renderHeader({ prev: prevArticle, next: nextArticle })
    return (
      <PageFrame small meta={meta} header={headerMarkup}>
        <div className="container" style={{ background: '#fff' }}>
          {loading && <Loader />}
          {!loading && articles && this.renderArticle(article)}
        </div>
      </PageFrame>
    )
  }
}
