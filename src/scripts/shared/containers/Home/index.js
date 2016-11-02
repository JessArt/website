import React, { Component, PropTypes } from 'react'

// mobx declaration
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import PromoSection from '../../components/promo-section'
import Loader from '../../components/loader'
import GridBanner from '../../components/grid-banner'

// style declaration
import styles from './style.css.json'
import './style.css'

@observer(['store'])
export default class HomePage extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  componentDidMount() {
    const { store } = this.props
    store.fetchImages({ params: { type: 'art'}})
    store.fetchImages({ params: { type: 'photo'}})
  }

  render () {
    const { store } = this.props
    const sections = ['art', 'photo', 'blog', 'contact'].map((type, i) => {
      const isEven = i % 2 === 0
      const style = isEven ? 'bright' : 'dark'
      const position = isEven ? 'left' : 'right'
      return <PromoSection type={type} style={style} position={position} />
    })

    const meta = {
      title: 'Jess Zaikova Gallery',
      description: 'Jess Zaikova art and photography',
      canonical: 'http://jess.gallery',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'art, drawing, paint, photo, photography'
        }
      }
    }

    const isArtLoading = store.isLoading('art')
    const isPhotosLoading = store.isLoading('photo')
    const art = store.getData('art')
    const photos = store.getData('photo')

    const banner = isArtLoading || isPhotosLoading || (art.length === 0 && photos.length === 0) ? (
      <Loader />
    ) : (
      <GridBanner items={art.concat(toJS(photos))} />
    )

    return (
      <PageFrame small meta={meta}>
        {banner}
        <div className={styles.sectionsContainer}>
          {sections}
        </div>
      </PageFrame>
    )
  }
}
