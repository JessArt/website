import React, { Component } from 'react'

// mobx declaration
import { observer } from 'mobx-react'

// components declaration
import { Link } from 'react-router'
import PageFrame from '../page'
import Loader from '../../components/loader'
import Grid from '../../components/grid'
import Media from '../../components/media'
import Subscribe from '../../components/subscribe'

// utils declaration
import { intersection } from 'lodash'

// styles declaration
import './style.css'
import styles from './style.css.json'

@observer(['images'])
export default class ArtPage extends Component {
  static willRender(stores) {
    return stores.images.fetchImages({ params: { type: 'photo' }})
  }

  componentDidMount() {
    this.props.images.fetchImages({ params: { type: 'photo' }})
  }

  createMeta() {
    const title = 'Jess\' Photos'
    const description = 'Photos taken during my various travels around the world (Czech Republic, USA, Russia, Serbia)'
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'jess zaikova, photos, travel, prague, usa, russia, czech republic, serbia, europe'
        },
        itemProp: {
          name: title,
          description,
          image: 'https://static.jess.gallery/photo_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': 'https://jess.gallery/photo',
          'og:image': 'https://static.jess.gallery/photo_og.jpg',
          'og:image:type': 'image/jpeg',
          'og:description': description,
          'twitter:card': 'summary_large_image',
          'twitter:site': '@jesszaikova',
          'twitter:creator': '@jesszaikova',
          'twitter:url': 'https://jess.gallery/photo',
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

  render() {
    const { images, location: { query, query: { tags: originalTags = [] }, pathname } } = this.props
    const isLoading = images.isLoading('photo')
    const photos = images.getData('photo')
    const tags = typeof originalTags === 'string' ? [originalTags] : originalTags
    const tagsObject = {}
    photos.forEach(x => {
      x.Tags.forEach(tag => {
        if (tagsObject[tag] === undefined) {
          tagsObject[tag] = 0
        }

        tagsObject[tag]++
      })
    })

    const sortedTags = Object
      .keys(tagsObject)
      .map(tag => {
        const freq = tagsObject[tag]

        return { freq, tag }
      })
      .sort((a, b) => a.freq < b.freq ? 1 : -1)
      .map(({ tag }) => tag)

    const tagsMarkup = sortedTags.map(tag => {
      const isActive = tags.includes(tag)
      const url = {
        pathname,
        query: {
          ...query,
          tags: isActive ? tags.filter(x => tag !== x) : tags.concat(tag)
        }
      }

      return (
        <Link
          to={url}
          key={tag}
          className={`${styles.tag} ${isActive ? styles.active : ''}`}>
          {tag}
        </Link>
      )
    })

    const areTagsEmpty = tags.length === 0
    const photosElements = photos.map(x => {
      const isShown = areTagsEmpty || intersection(x.Tags, tags).length > 0

      if (isShown) {
        return (
          <Media key={x.ID} item={x} />
        )
      }
    })
    .filter(Boolean)

    const content = isLoading ? (
      <div>
        <Loader />
      </div>
    ) : (
      <div>
        <div className={styles.tagsContainer}>
          {tagsMarkup}
        </div>
        <Grid>
          {photosElements}
        </Grid>
        <Subscribe />
      </div>
    )

    const meta = this.createMeta()

    return (
      <PageFrame small meta={meta}>
        {content}
      </PageFrame>
    )
  }
}
