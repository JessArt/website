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
import Sharing from '../../components/sharing'
import Disqus from '../../components/disqus'

// utils declaration
import { autobind } from 'core-decorators'

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

  componentDidMount() {
    const { location: { query: { type } }, images } = this.props
    images.fetchImages({ params: { type } })

    document.addEventListener('keydown', this.handleKeys)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys)
  }

  @autobind
  _handleKeys(e) {
    const { params: { id }, location: { query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.ID === id)
    const previous = items[index - 1]
    const next = items[index + 1]
    if (e.keyCode === 37 && previous) {
      browserHistory.push({ pathname: `/media/${previous.ID}`, query: { type: previous.Type } })
    } else if (e.keyCode === 39 && next) {
      browserHistory.push({ pathname: `/media/${next.ID}`, query: { type: next.Type } })
    }
  }

  getItem() {
    const { params: { id }, location: { query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.ID === id)
    const item = items[index]

    return item
  }

  createMeta() {
    const item = this.getItem()

    if (item) {
      const meta = {
        title: item.Title,
        description: item.Description,
        meta: {
          name: {
            keywords: item.Keywords
          },
          itemProp: {
            name: item.Title,
            description: item.Description,
            image: item.BigURL
          },
          property: {
            'og:title': item.Title,
            'og:url': `//jess.gallery/media/${item.ID}?type=${item.Type}`,
            'og:image': item.BigURL,
            'og:image:type': 'image/jpeg',
            'og:description': item.Description
          }
        },
        auto: {
          ograph: true
        }
      }

      if (item.OriginalWidth && item.OriginalHeight) {
        meta.meta.property['og:image:width'] = 500
        meta.meta.property['og:image:height'] = 500 / (item.OriginalWidth / item.OriginalHeight)
      }

      return meta
    }
  }

  renderItem() {
    const { params: { id }, location: { pathname, search, query: { type } }, images } = this.props
    const items = images.getData(type)
    const index = items.findIndex((x) => x.ID === id)
    const item = items[index]
    const previous = items[index - 1]
    const next = items[index + 1]

    const url = `https://jess.gallery${pathname}${search}`

    return item ? (
      <div>
        <MediaBanner
          item={item}
          sharing={<Sharing url={url} text={item.Title} />}
          previous={previous}
          next={next}
          comments={!__SERVER__ && <Disqus id={`${type}/${id}`} url={url} title={item.Title} />} />
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
