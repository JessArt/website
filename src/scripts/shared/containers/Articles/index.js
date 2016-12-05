import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Subscribe from '../../components/subscribe'

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

  renderArticle(article) {
    console.log(article)

    return (
      <div className={styles.article} key={article.ID}>
        <Link to={{ pathname: `/travel/${article.ID}` }}>
          <h2 className={styles.title}>
            {article.Title}
          </h2>
          <h4 className={styles.subtitle}>
            {article.Subtitle}
          </h4>
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
            {!loading && articles && articles.map(this.renderArticle.bind(this))}
          </div>
          <div className={styles.subscribe}>
            <Subscribe />
          </div>
        </div>
      </PageFrame>
    )
  }
}
