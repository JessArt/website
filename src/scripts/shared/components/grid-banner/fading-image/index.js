import React, { Component, PropTypes } from 'react'

// style declaration
import './style.css'
import styles from './style.css.json'

// utility declaration
import { preload } from 'pic-loader'

const TRANSITION_TIME = 100
const MIN_OPACITY = 0
const MAX_OPACITY = 1

export default class FadingImage extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentURL: props.url,
      lastURL: null,
      lastOpacity: 0,
      newOpacity: 1
    }
  }

  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      preload(props.url)
      this.setState({
        lastURL: this.props.url,
        lastOpacity: 1
      }, () => {
        setTimeout(() => {
          this.setState({
            newOpacity: 0
          }, () => {
            setTimeout(() => {
              this.setState({
                newOpacity: 1,
                lastOpacity: 0,
                currentURL: props.url
              })
            }, TRANSITION_TIME)
          })
        }, TRANSITION_TIME)
      })
    }
  }

  render() {
    const { lastURL, lastOpacity, newOpacity, currentURL } = this.state

    const currentImageStyle = {
      opacity: newOpacity,
      transition: newOpacity === MIN_OPACITY ? 'none' : 'opacity 0.3s'
    }

    const oldImageStyle = {
      opacity: lastOpacity,
      transition: lastOpacity === MAX_OPACITY ? 'none' : 'opacity 0.3s'
    }

    return (
      <div className={styles.container}>
        <img
          className={styles.currentImage}
          src={currentURL}
          style={currentImageStyle} />
        <img
          className={styles.lastImage}
          src={lastURL}
          style={oldImageStyle} />
      </div>
    )
  }
}
