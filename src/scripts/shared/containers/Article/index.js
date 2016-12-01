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
    return (
      <PageFrame small>
        <div className="container" style={{ background: '#fff' }}>
          {loading && <Loader />}
          {!loading && articles && this.renderArticle(articles.find(({ ID }) => ID === id))}
        </div>
      </PageFrame>
    )
  }
}
