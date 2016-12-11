/* global __SERVER__ */

import { observable, asMap, transaction, toJS } from 'mobx'
import { get } from '../utils/fetch'

export class StoriesStore {
  constructor() {
    if (!__SERVER__ &&
        window.__INITIAL_DATA__ &&
        window.__INITIAL_DATA__.stories &&
        window.__INITIAL_DATA__.stories.data
      ) {
      this.initialDict = window.__INITIAL_DATA__.stories.dict
      this.initialValue = window.__INITIAL_DATA__.stories.data
    }

    const initialValue = {
      storiesList: {
        loaded: false,
        loading: false,
        error: null,
        data: []
      }
    }

    this.storiesDict = observable(asMap(this.initialDict || {}))
    this.data = observable(this.initialValue || initialValue)
  }

  serialize() {
    return {
      data: toJS(this.data),
      dict: toJS(this.storiesDict)
    }
  }

  isStoryLoading(id) {
    const item = this.storiesDict.get(id)

    return item ? item.loading : false
  }

  getStory(id) {
    const item = this.storiesDict.get(id)

    return item ? item.data : null
  }

  areStoriesLoading() {
    return this.data.storiesList.loading
  }

  getStories() {
    return this.data.storiesList.data
  }

  fetchStories() {
    if (!this.data.storiesList.loading && !this.data.storiesList.loaded) {
      this.data.storiesList.loading = true

      return get('/v1/api/stories')
        .then(res => {
          transaction(() => {
            this.data.storiesList.loading = false
            this.data.storiesList.data = res
          })
        })
    }
  }

  fetchStory(id) {
    if (!this.storiesDict.get(id) || !this.storiesDict.get(id).loading) {
      this.storiesDict.set(id, {
        loading: true,
        data: null,
        error: null
      })

      return get(`/v1/api/stories/${id}`)
        .then(res => {
          this.storiesDict.set(id, {
            data: res,
            loading: false,
            error: null
          })
        })
    }
  }
}
