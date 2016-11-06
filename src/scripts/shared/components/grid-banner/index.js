import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'
import FadingImage from './fading-image'

// style declaration
import './style.css'
import styles from './style.css.json'

// utility declaration
import { autobind } from 'core-decorators'
import { random, shuffle, sample } from 'lodash'

// constants declaration
const TRANSITION_TIME = 5000
const MIN_IMAGES_NUMBER = 5
const MAX_IMAGES_NUMBER = 50
const FIRST_INDEX = 0
const MIN_LEFT_POSITION = 0
const MAX_LEFT_POSITION = 80
const MIN_TOP_POSITION = 0
const MAX_TOP_POSITION = 250
const MIN_WIDTH = 150
const MAX_WIDTH = 250

export default class GridBanner extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }

  state = {
    number: 25
  }

  componentDidMount() {
    this.startTransition()
  }

  startTransition() {
    clearInterval(this.timer)
    this.timer = setTimeout(() => {
      this.forceUpdate()
      this.startTransition()
    }, TRANSITION_TIME)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  @autobind
  rearrange() {
    this.forceUpdate(() => {
      this.startTransition()
    })
  }

  @autobind
  addImage() {
    const imagesNumber = 2
    this.changeImages(imagesNumber)
  }

  @autobind
  removeImage() {
    const imagesNumber = -2
    this.changeImages(imagesNumber)
  }

  changeImages(number) {
    let newNumber = this.state.number + number

    if (newNumber < MIN_IMAGES_NUMBER) {
      newNumber = MIN_IMAGES_NUMBER
    }

    if (newNumber > MAX_IMAGES_NUMBER) {
      newNumber = MAX_IMAGES_NUMBER
    }
    this.setState({
      number: newNumber
    })
  }

  renderMobileVersion(items) {
    return (
      <div className={styles.mobileContainer} onClick={this.rearrange}>
        <FadingImage url={sample(items).small_url} />
      </div>
    )
  }

  render() {
    const { number } = this.state
    const { items } = this.props
    const processedItems = shuffle(items)
      .filter(x => Boolean(x.originalWidth) && x.originalWidth > x.originalHeight)
      .slice(FIRST_INDEX, number)

    const images = processedItems.map((item, i) => {
        const leftPosition = random(MIN_LEFT_POSITION, MAX_LEFT_POSITION)
        const topPosition = random(MIN_TOP_POSITION, MAX_TOP_POSITION)
        const width = random(MIN_WIDTH, MAX_WIDTH)

      return (
        <Link to={{ pathname: `/media/${item.id}`, query: { type: item.type }}}
          className={styles.elem} key={`grid_banner_${i}`}
          style={{ left: `${leftPosition}%`, top: `${topPosition}px`, width: `${width}px`}}>
          <img className={styles.image} src={item.small_url} alt={item.title} />
        </Link>
      )
    })

    return (
      <div>
        {this.renderMobileVersion(processedItems)}
        <div className={styles.container}>
          {images}
          <div className={styles.rearrange}>
            <div onClick={this.removeImage}>
              Remove one image
            </div>
            <div onClick={this.rearrange}>
              Click to rearrange
            </div>
            <div onClick={this.addImage}>
              Add one image
            </div>
          </div>
        </div>
      </div>
    )
  }
}
