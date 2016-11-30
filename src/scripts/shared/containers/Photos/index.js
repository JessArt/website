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
    return stores.images.fetchImages({ params: { type: 'photo' }})
  }

  componentDidMount() {
    this.props.store.fetchImages({ params: { type: 'photo' }})
  }

  createMeta() {
    const title = 'Jess\' Photos'
    const description = 'Photos made during my travels in different countries'
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'photos, travel, usa, russia, prague'
        },
        itemProp: {
          name: title,
          description,
          image: '//static.jess.gallery/photo_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': '//jess.gallery/photo',
          'og:image': '//static.jess.gallery/photo_og.jpg',
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
    const isLoading = this.props.store.isLoading('photo')
    const photos = this.props.store.getData('photo')
    const photosElements = (photos || []).map(x => {
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
