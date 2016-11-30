import Base from './base'
import { observable, transaction } from 'mobx'
import { get } from '../utils/fetch'

export class ArticlesStore extends Base {
  constructor() {
    super('articles')
    const initialValue = {
      loading: false,
      articles: null
    }
    this.data = observable(this.initialValue || initialValue)
  }

  fetchArticles() {
    this.data.loading = true
    get('/v1/api/articles')
      .then(res => {
        transaction(() => {
          this.data.loading = false
          this.data.articles = res
        })
      })
  }
}
