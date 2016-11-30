import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'

import './style.css'
import styles from './style.css.json'

@observer(['articles'])
export default class ArticlesPage extends Component {
  componentDidMount() {
    this.props.articles.fetchArticles()
  }

  renderArticle(article) {
    console.log(article)

    return (
      <div className={styles.article} key={article.ID}>
        <Link to={{ pathname: `/articles/${article.ID}` }}>
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
    return (
      <PageFrame small>
        <div className={`container ${styles.container}`} style={{ background: '#fff' }}>
          {loading && <Loader />}
          {!loading && articles && articles.map(this.renderArticle.bind(this))}
        </div>
      </PageFrame>
    )
  }
}
