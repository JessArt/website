import { delay, wait } from 'delounce'
import { preload } from 'pic-loader'
import { observable, transaction } from 'mobx'
import Base from './base'
import { get } from '../utils/fetch'

export class ImagesStore extends Base {
  constructor() {
    super('images')
    const initialValue = {
      art: {
        data: [],
        loading: false,
        error: null
      },
      photo: {
        data: [],
        loading: false,
        error: null
      }
    }

    this.data = observable(this.initialValue || initialValue)
  }

  isLoading(type) {
    return this.data[type].loading
  }

  getData(type) {
    return this.data[type].data || []
  }

  fetchImages({ params }) {
    const type = params.type

    const isLoading = this.data[type].loading
    const isLoaded = Boolean(this.data[type].data.length)

    if (isLoading || isLoaded) {
      return Promise.resolve()
    } else {
      this.data[type].loading = true
      const promise = get('/v1/api/images', { params })
      return delay({ fn: promise, time: 200 })
        .then((rawRes) => {
          const res = rawRes.map(x => {
            return {
              ...x,
              description: x.description.replace(/"/g, '\"'),
              title: x.title.replace(/"/g, '\"')
            }
          })
          // preload only first 15 images
          const firstImages = res.slice(0, 15)
          const fn = preload(firstImages)
          return wait({ fn, time: 1000 })
            .then(() => {
              transaction(() => {
                this.data[type].data = res
                this.data[type].loading = false
              })
            })
        })
    }
  }
}
