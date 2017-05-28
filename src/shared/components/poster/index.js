import React, { Component, PropTypes } from 'react'

// style declaration

import styles from './style.sass'

export default class Poster extends Component {
  static propTypes = {
    image: PropTypes.string,
    children: PropTypes.element
  }

  render() {
    const { image, children } = this.props

    return (
      <div className={styles.bannerContainer}>
        <img className={styles.banner} src={image} />
        <div className={styles.bannerOverlay}>
          {children}
        </div>
      </div>
    )
  }
}
