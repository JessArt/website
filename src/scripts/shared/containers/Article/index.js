import React, { Component } from 'react'

import { observer } from 'mobx-react'

import PageFrame from '../page'
import Loader from '../../components/loader'
import Article from './article'

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
      const meta = {
        title: article.Title,
        description: article.Description,
        meta: {
          name: {
            keywords: article.Keywords
          },
          articleProp: {
            name: article.Title,
            description: article.Description
          },
          property: {
            'og:title': article.title,
            'og:url': `//jess.gallery/travel/${article.ID}`,
            'og:image': '//static.jess.gallery/photo_og.jpg',
            'og:image:type': 'image/jpeg',
            'og:description': article.Description
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
            image: '//static.jess.gallery/photo_og.jpg'
          },
          property: {
            'og:title': title,
            'og:url': '//jess.gallery/travel',
            'og:image': '//static.jess.gallery/photo_og.jpg',
            'og:image:type': 'image/jpeg',
            'og:description': description
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
    return (
      <div className={styles.article} key={article.ID}>
        <h2 className={styles.title}>
          {article.Title}
        </h2>
        <h4 className={styles.subtitle}>
          {article.Subtitle}
        </h4>
        <Article text={article.Text} />
      </div>
    )
  }

  render() {
    const { articles: { data: { loading, articles } }, params: { id } } = this.props

    const article = !loading && articles && articles.find(({ ID }) => ID === id)
    const meta = this.createMeta(article)

    return (
      <PageFrame small meta={meta}>
        <div className="container" style={{ background: '#fff' }}>
          {loading && <Loader />}
          {!loading && articles && this.renderArticle(article)}
        </div>
      </PageFrame>
    )
  }
}
