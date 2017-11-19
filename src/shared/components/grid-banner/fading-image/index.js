import React, { Component, PropTypes } from 'react'

// style declaration
import styles from './style.sass'

export default class FadingImage extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    const { url } = this.props
    return (
      <div className={styles.container}>
        <img
          className={styles.currentImage}
          src={url} />
      </div>
    )
  }
}
