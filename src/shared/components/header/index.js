import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'

// style declaration
import styles from './style.sass'


// utils declaration
import { autobind } from 'core-decorators'

// assets declaration
import fbIcon from './images/fb.png'
import flickrIcon from './images/flickr.png'
import tumblrIcon from './images/tumblr.png'
import twitterIcon from './images/twitter.png'
import instagramIcon from './images/instagram.png'

let hideOrder = false

export default class Header extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  }

  constructor(props) {
    super(props)

    this.state = {
      menu: false,
      order: hideOrder ? false : true
    }
  }

  @autobind
  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  @autobind
  hideOrder(e) {
    e.preventDefault()
    e.stopPropagation()
    hideOrder = true
    this.setState({ order: false })

    return false
  }

  order() {
    hideOrder = true
  }

  renderSmallHeader({ invisible = false } = {}) {
    const { children } = this.props
    const { menu, order } = this.state

    const TUMBLR_URL = 'https://jesszaikova.tumblr.com/'
    const FACEBOOK_URL = 'https://www.facebook.com/jesszaikova'
    const FLICKR_URL = 'https://www.flickr.com/jessellisart'
    const TWITTER_URL = 'https://twitter.com/jesszaikova'
    const INSTAGRAM_URL = 'https://www.instagram.com/jesszaikova/'

    const facebookIconMarkup = (
      <a className={styles.smallIconContainer} href={FACEBOOK_URL} target={'_blank'}>
        <img className={styles.smallIcon} src={fbIcon} alt={'My Facebook account'} />
      </a>
    )
    
    const instagramIconMarkup = (
      <a className={`${styles.smallIconContainer} ${styles.instagramIconContainer}`} href={INSTAGRAM_URL} target={'_blank'}>
        <img className={`${styles.smallIcon} ${styles.instagramIcon}`} src={instagramIcon} alt={'My Instagram account'} />
      </a>
    )

    const tumblerIconMarkup = (
      <a className={styles.smallIconContainer} href={TUMBLR_URL} target={'_blank'}>
        <img className={styles.smallIcon} src={tumblrIcon} alt={'My Tumbler account'} />
      </a>
    )

    const twitterIconMarkup = (
      <a className={styles.smallIconContainer} href={TWITTER_URL} target={'_blank'}>
        <img className={styles.smallIcon} src={twitterIcon} alt={'My Twitter account'} />
      </a>
    )

    const flickrIconMarkup = (
      <a className={styles.smallIconContainer} href={FLICKR_URL} target={'_blank'}>
        <img className={styles.smallIcon} src={flickrIcon} alt={'My Flickr account'} />
      </a>
    )
    
    return (
      <div className={`${styles.smallHeader} ${invisible ? styles.invisible : ''}`}>
        <div className={styles.smallRow}>
          <div
            className={`${styles.hamburger} ${menu ? styles.active: ''}`}
            onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </div>
          <Link to={{ pathname: '/' }} className={styles.smallTitle}>
            <span className={styles.coloured}>
              {'Jess'}
            </span>
            <span>
              {'Zaikova'}
            </span>
          </Link>
          <div className={styles.smallLinks}>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/art' }}>
              {'Art'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/photo' }}>
              {'Photo'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/travel' }}>
              {'Writing'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/collections' }}>
              {'Progress'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/music' }}>
              {'Music'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/about' }}>
              {'About'}
            </Link>
          </div>
          <div className={styles.smallExternal}>
            {facebookIconMarkup}
            {instagramIconMarkup}
            {tumblerIconMarkup}
            {twitterIconMarkup}
            {flickrIconMarkup}
          </div>
          {menu &&
            <div className={styles.hamburgerMenu}>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/art' }}>
                  {'Art'}
                </Link>
              </div>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/photo' }}>
                  {'Photo'}
                </Link>
              </div>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/travel' }}>
                  {'Travel'}
                </Link>
              </div>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/collections' }}>
                  {'Collections'}
                </Link>
              </div>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/music' }}>
                  {'Music'}
                </Link>
              </div>
              <div className={styles.menuRow}>
                <Link className={styles.smallLink} to={{ pathname: '/about' }}>
                  {'About'}
                </Link>
              </div>
              <div className={`${styles.menuRow} ${styles.list}`}>
                {facebookIconMarkup}
                {instagramIconMarkup}
                {tumblerIconMarkup}
                {twitterIconMarkup}
                {flickrIconMarkup}
              </div>
            </div>}
          </div>
          {order && <Link
            className={styles.order}
            onClick={this.order}
            to={{ pathname: '/about', query: { write: true } }}>
            {'I am available for commissions! Prints are also available.'}
            <div className={styles.close} onClick={this.hideOrder}>
              {'x'}
            </div>
          </Link>}
          {children}
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderSmallHeader({ invisible: true })}
        {this.renderSmallHeader()}
      </div>
    )
  }
}
