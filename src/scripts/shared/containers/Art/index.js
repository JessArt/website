import React, { Component } from 'react'

// mobx declaration
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import Loader from '../../components/loader'
import Grid from '../../components/grid'
import Media from '../../components/media'


@observer(['images'])
export default class ArtPage extends Component {
  static willRender(stores) {
    return stores.images.fetchImages({ params: { type: 'art' }})
  }

  componentDidMount() {
    this.props.store.fetchImages({ params: { type: 'art' }})
  }

  createMeta() {
    const title = 'Jess\' Artworks'
    const description = 'Artwork in different styles'
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'art, painting, drawing, graphite, charcoal'
        },
        itemProp: {
          name: title,
          description,
          image: '//static.jess.gallery/art_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': '//jess.gallery/art',
          'og:image': '//static.jess.gallery/art_og.jpg',
          'og:image:type': 'image/jpeg',
          'og:description': description
        }
      },
      auto: {
        ograph: true
      }
    }

    return meta
  }

  render() {
    const { store } = this.props
    const isLoading = store.isLoading('art')
    const photos = store.getData('art')
    const photosElements = photos.map(x => {
      return (
        <Media key={x.id} item={x} />
      )
    })

    const content = isLoading ? (
      <div>
        <Loader />
      </div>
    ) : (
      <Grid>
        {photosElements}
      </Grid>
    )

    const meta = this.createMeta()

    return (
      <PageFrame small meta={meta}>
        {content}
      </PageFrame>
    )
  }
}
