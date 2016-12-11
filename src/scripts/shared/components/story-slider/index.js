import React, { Component, PropTypes } from 'react'

// utils declaration
import { autobind } from 'core-decorators'
import { preload } from 'pic-loader'

// style declaration
import './style.css'
import styles from './style.css.json'

export default class StorySlider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  }

  state = {
    active: 0
  }

  selectImage(i) {
    this.setState({ active: i })
  }

  componentDidMount() {
    this.preloadImages()
    document.addEventListener('keydown', this.handleKeys)
  }

  componentWillReceiveProps(props) {
    this.preloadImages(props)
  }

  preloadImages(props) {
    const { images } = props || this.props
    preload((images || []).map(image => image.Cover))
  }

  @autobind
  selectNext() {
    const { active } = this.state
    const { images } = this.props

    if (active !== (images || []).length - 1) {
      this.setState({ active: active + 1})
    }
  }

  @autobind
  selectPrevious() {
    const { active } = this.state

    if (active !== 0) {
      this.setState({ active: active - 1 })
    }
  }

  @autobind
  handleKeys(e) {
    if (e.keyCode === 37) {
      this.selectPrevious()
    }

    if (e.keyCode === 39) {
      this.selectNext()
    }

    if (e.keyCode === 37 || e.keyCode === 39) {
      e.preventDefault()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys)
  }

  render() {
    const { active } = this.state
    const { images } = this.props

    const activeImage = images[active]

    const thumbnails = images.map((image, i) => {
      const className = `${styles.thumbnailContainer} ${image.ID === activeImage.ID ? styles.active : ''}`
      return (
        <div
          onClick={this.selectImage.bind(this, i)}
          key={image.ID}
          className={className}>
          <img src={image.Cover} className={styles.thumbnailImage} />
        </div>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.imagesContainer}>
          <div className={styles.activeContainer}>
            <div className={styles.mainImageContainer}>
              <img onClick={this.selectNext} className={styles.mainImage} src={activeImage.Cover} />
            </div>
            <div className={styles.activeText}>
              <h3 className={styles.activeTitle}>
                {activeImage.Title}
              </h3>
              <div className={styles.activeDescription}>
                {activeImage.Description}
              </div>
              <div className={styles.navigationContainer}>
                <div className={styles.navigationLinks}>
                  <div onClick={this.selectPrevious}
                    className={`${styles.navigationLink} ${active === 0 ? styles.invisible : ''}`}>
                    {'← Previous'}
                  </div>
                  <div onClick={this.selectNext}
                    className={`${styles.navigationLink} ${active === images.length - 1 ? styles.invisible : ''}`}>
                    {'Next →'}
                  </div>
                </div>
                <div className={styles.navigationTip}>
                  {'You can navigate with'}
                  <span onClick={this.selectPrevious} className={styles.arrowContainer}>
                    {'←'}
                  </span>
                  {' and '}
                  <span onClick={this.selectNext} className={styles.arrowContainer}>
                    {'→'}
                  </span>
                  {'on your keyboard'}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.thumbnailsWrapper}>
            <div className={styles.thumbnailsContainer}>
              {thumbnails}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
