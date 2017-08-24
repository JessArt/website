import React, { Component } from 'react'

// redux declaration
import { connect } from 'react-redux'
import { actions, selectors } from '../../../shared/store/redux'

import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Subscribe from '../../components/subscribe'
import BigGrid from '../../layouts/big-grid'

// utils declaration
import { autobind } from 'core-decorators'

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
    const title = 'Jess\' Travel Articles'
    const description = 'Travel articles (and anything else of interest) of Jess Zaikova around the world. USA, Russia, Czech, Prague, Serbia and much more!'
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

  renderArticles(articles) {
    const processedArticles = articles.map(article => ({
      id: article.ID,
      link: `/travel/${article.ID}`,
      img: article.Cover,
      title: article.Title,
      subtitle: article.Subscribe
    }))

    return <BigGrid elements={processedArticles} />
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
      <PageFrame wide meta={meta}>
        <div>
          <div className={styles.content}>
            {loading && <Loader />}
            {!loading && articles && this.renderArticles(articles)}
          </div>
          <div className={styles.subscribe}>
            <Subscribe />
          </div>
        </div>
      </PageFrame>
    )
  }
}
