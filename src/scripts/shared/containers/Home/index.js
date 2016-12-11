import React, { Component, PropTypes } from 'react'

// mobx declaration
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import PromoSection from '../../components/promo-section'
import Loader from '../../components/loader'
import GridBanner from '../../components/grid-banner'
import Subscribe from '../../components/subscribe'

// style declaration
import styles from './style.css.json'
import './style.css'

@observer(['images'])
export default class HomePage extends Component {
  static propTypes = {
    images: PropTypes.object
  }

  componentDidMount() {
    const { images } = this.props
    images.fetchImages({ params: { type: 'art'}})
    images.fetchImages({ params: { type: 'photo'}})
  }

  render () {
    const { images } = this.props
    const sections = ['art', 'photo', 'blog', 'contact'].map((type, i) => {
      const EVEN_DIVIDER = 2
      const EVEN_REMINDER = 0
      const isEven = i % EVEN_DIVIDER === EVEN_REMINDER
      const style = isEven ? 'bright' : 'dark'
      const position = isEven ? 'left' : 'right'
      return <PromoSection key={type} type={type} style={style} position={position} />
    })

    const metaTitle = 'Jess Zaikova Gallery'
    const metaDescription = 'Jess Zaikova art, photography, travel blog, my music and craft. Write to order prints!'
    const metaImage = 'https://static.jess.gallery/site_og.jpg'

    const meta = {
      title: metaTitle,
      description: metaDescription,
      canonical: 'https://jess.gallery',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'jess zaikova, art, portrait drawing, drawing, photography, travel blog, nature photos'
        },
        itemProp: {
          name: metaTitle,
          description: metaDescription,
          image: metaImage
        },
        property: {
          'og:title': metaTitle,
          'og:url': 'https://jess.gallery',
          'og:image': metaImage,
          'og:image:type': 'image/jpeg',
          'og:description': metaDescription,
          'twitter:card': 'summary_large_image',
          'twitter:site': '@jesszaikova',
          'twitter:creator': '@jesszaikova',
          'twitter:url': 'https://jess.gallery',
          'twitter:title': metaTitle,
          'twitter:description': metaDescription,
          'twitter:image': metaImage
        }
      }
    }

    const isArtLoading = images.isLoading('art')
    const isPhotosLoading = images.isLoading('photo')
    const art = images.getData('art')
    const photos = images.getData('photo')

    const banner = isArtLoading || isPhotosLoading || (art.length === 0 && photos.length === 0) ? (
      <Loader />
    ) : (
      <GridBanner items={art.concat(toJS(photos))} />
    )

    return (
      <PageFrame small meta={meta}>
        <div className={styles.container}>
          {banner}
          <div className={styles.sectionsContainer}>
            {sections}
          </div>
          <Subscribe />
        </div>
      </PageFrame>
    )
  }
}
