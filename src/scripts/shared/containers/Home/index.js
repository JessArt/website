import React, { Component } from 'react'

// components declaration
import PageFrame from '../page'
import PromoSection from '../../components/promo-section'

// style declaration
import styles from './style.css.json'
import './style.css'

export default class HomePage extends Component {
  render () {
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

    return (
      <PageFrame meta={meta}>
        <div className={styles.sectionsContainer}>
          {sections}
        </div>
      </PageFrame>
    )
  }
}
