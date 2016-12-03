import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'
import Loader from '../loader'
import Subscribe from '../subscribe'

// utils declaration
import { autobind } from 'core-decorators'
import { preload } from 'pic-loader'
import { delay } from 'delounce'

// styles declaration
import './style.css'
import styles from './style.css.json'

export default class MediaBanner extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    previous: PropTypes.object,
    next: PropTypes.object,
    comments: PropTypes.element
  }

  state = {
    isLoading: false
  }

  componentWillReceiveProps(props) {
    if (props.item) {
      if (!this.props.item || this.props.item.ID !== props.item.ID) {
        this.setState({ isLoading: true })

        const fn = preload(props.item.BigURL)
        delay({ fn, time: 200 })
          .then(() => {
            if (this.props.item && this.props.item.ID === props.item.ID) {
              this.setState({ isLoading: false })
            }
          })
      }
    }
  }

  @autobind
  renderTags(tags = []) {
    const { item } = this.props

    return tags.map(tag => {
      const url = {
        pathname: item.Type,
        query: {
          tags: [tag]
        }
      }

      return (
        <Link key={tag} className={styles.tag} to={url}>
          {tag}
        </Link>
      )
    })
  }

  render() {
    const { isLoading } = this.state
    const { item, previous, next, comments } = this.props

    const leftLink = previous ? (
      <Link to={{ pathname: `/media/${previous.ID}`, query: { type: previous.Type } }}
         className={`${styles.arrow} ${styles.left}`}>
        {'←'}
      </Link>
    ) : null

    const rightLink = next ? (
      <Link to={{ pathname: `/media/${next.ID}`, query: { type: next.Type } }}
        className={`${styles.arrow} ${styles.right}`}>
        {'→'}
      </Link>
    ) : null

    const content = isLoading
      ? <div className={styles.loaderContainer}><Loader white /></div>
    : <img className={styles.banner} src={item.BigURL} alt={item.Title} />

    const isVisible = !isLoading && item
    const originalLink = (
      <Link className={styles.originalLink}
         style={{ visibility: isVisible ? 'visible' : 'hidden'}}
         to={{ pathname: '/about', query: { write: true } }}>
        {'Want your own?'}
      </Link>
    )

    const commentsMarkup = comments ? (
      <div className={styles.comments}>
        {comments}
      </div>
    ) : null

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {leftLink}
          <div className={styles.bannerContainer}>
            {content}
          </div>
          {rightLink}
          {originalLink}
        </div>
        <div className={`${styles.textContainer} container`}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              {item.Title}
            </h2>
            <div className={styles.info}>
              <div>
                {this.renderTags(item.Tags)}
              </div>
              <div className={styles.rightInfo}>
                <div>
                  {item.Date}
                </div>
                <div>
                  {item.Location}
                </div>
              </div>
            </div>
            <div className={styles.description}>
              {item.Description}
            </div>
            {commentsMarkup}
            <Subscribe className={styles.subscribe} />
          </div>
        </div>
      </div>
    )
  }
}
