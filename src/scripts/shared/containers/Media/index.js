/* global __SERVER__ */

import React, { Component, PropTypes } from 'react'

// router declaration
import { browserHistory } from 'react-router'

// mobx declaration
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import MediaBanner from '../../components/media-banner'
import Loader from '../../components/loader'
import Disqus from '../../components/disqus'

@observer(['images'])
export default class MediaPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static willRender(stores, props) {
    const { location: { query: { type = 'photo' } = {} } = {} } = props
    return stores.images.fetchImages({ params: { type }})
  }

  constructor(props) {
    super(props)

    this.handleKeys = this._handleKeys.bind(this)
  }

  componentDidMount() {
    const { location: { query: { type } }, images } = this.props
    images.fetchImages({ params: { type } })

    document.addEventListener('keydown', this.handleKeys)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys)
  }

  _handleKeys(e) {
    const { params: { id }, location: { query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.id === id)
    const previous = items[index - 1]
    const next = items[index + 1]
    if (e.keyCode === 37 && previous) {
      browserHistory.push({ pathname: `/media/${previous.id}`, query: { type: previous.type } })
    } else if (e.keyCode === 39 && next) {
      browserHistory.push({ pathname: `/media/${next.id}`, query: { type: next.type } })
    }
  }

  getItem() {
    const { params: { id }, location: { query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.id === id)
    const item = items[index]

    return item
  }

  createMeta() {
    const item = this.getItem()

    if (item) {
      const meta = {
        title: item.title,
        description: item.description,
        meta: {
          name: {
            keywords: item.keywords
          },
          itemProp: {
            name: item.title,
            description: item.description,
            image: item.big_url
          },
          property: {
            'og:title': item.title,
            'og:url': `//jess.gallery/media/${item.id}?type=${item.type}`,
            'og:image': item.big_url,
            'og:image:type': 'image/jpeg',
            'og:description': item.description
          }
        },
        auto: {
          ograph: true
        }
      }

      if (item.originalWidth && item.originalHeight) {
        meta.meta.property['og:image:width'] = 500
        meta.meta.property['og:image:height'] = 500 / (item.originalWidth / item.originalHeight)
      }

      return meta
    }
  }

  renderItem() {
    const { params: { id }, location: { pathname, search, query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.id === id)
    const item = items[index]
    const previous = items[index - 1]
    const next = items[index + 1]

    const url = `https://jess.gallery/${pathname}${search}`

    return item ? (
      <div>
        <MediaBanner
          item={item}
          previous={previous}
          next={next}
          comments={!__SERVER__ && <Disqus id={`${type}/${id}`} url={url} title={item.title} />} />
      </div>
    ) : this.renderLoader()
  }

  renderLoader() {
    return <Loader />
  }

  render() {
    const { location: { query: { type } }, images } = this.props

    const isLoading = images.isLoading(type)
    const content = isLoading ? this.renderLoader() : this.renderItem()
    const meta = this.createMeta()
    return (
      <PageFrame small wide meta={meta}>
        {content}
      </PageFrame>
    )
  }
}
