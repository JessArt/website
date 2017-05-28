import Base from './base'
import { observable, transaction } from 'mobx'
import { get } from '../utils/fetch'

export class ArticlesStore extends Base {
  constructor() {
    super('articles')
    const initialValue = {
      loading: false,
      articles: [],
      error: null
    }
    this.data = observable(this.initialValue || initialValue)
  }

  fetchArticles() {
    const isLoading = this.data.loading
    const isLoaded = Boolean(this.data.articles.length)

    if (isLoading || isLoaded) {
      return Promise.resolve()
    } else {
      this.data.loading = true
      return get('/v1/api/articles')
        .then(res => {
          transaction(() => {
            this.data.loading = false
            this.data.articles = res
          })
        })
      }
  }
}
