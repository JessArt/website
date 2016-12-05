import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'

// style declaration
import styles from './style.css.json'
import './style.css'

// utils declaration
import { autobind } from 'core-decorators'

// assets declaration
import fbIcon from './images/fb.png'
import flickrIcon from './images/flickr.png'
import tumblrIcon from './images/tumblr.png'
import twitterIcon from './images/twitter.png'

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
              {'Travel'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/music' }}>
              {'Music'}
            </Link>
            <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/about' }}>
              {'About'}
            </Link>
          </div>
          <div className={styles.smallExternal}>
            <a className={styles.smallIconContainer} href={'//jessellisart.tumblr.com'} target={'_blank'}>
              <img className={styles.smallIcon} src={tumblrIcon} alt={'My Tumbler account'} />
            </a>
            <a className={styles.smallIconContainer} href={'https://www.facebook.com/jessgalleryart'} target={'_blank'}>
              <img className={styles.smallIcon} src={fbIcon} alt={'My Facebook account'} />
            </a>
            <a className={styles.smallIconContainer} href={'//www.flickr.com/jessellisart'} target={'_blank'}>
              <img className={styles.smallIcon} src={flickrIcon} alt={'My Flickr account'} />
            </a>
            <a className={styles.smallIconContainer} href={'//www.twitter.com/jessellisart'} target={'_blank'}>
              <img className={styles.smallIcon} src={twitterIcon} alt={'My Twitter account'} />
            </a>
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
                <a className={styles.smallIconContainer} href={'//jessellisart.tumblr.com'} target={'_blank'}>
                  <img className={styles.smallIcon} src={tumblrIcon} alt={'My Tumbler account'} />
                </a>
                <a className={styles.smallIconContainer} href={'https://www.facebook.com/jessellisart'} target={'_blank'}>
                  <img className={styles.smallIcon} src={fbIcon} alt={'My Facebook account'} />
                </a>
                <a className={styles.smallIconContainer} href={'//www.flickr.com/jessellisart'} target={'_blank'}>
                  <img className={styles.smallIcon} src={flickrIcon} alt={'My Flickr account'} />
                </a>
                <a className={styles.smallIconContainer} href={'//www.twitter.com/jessellisart'} target={'_blank'}>
                  <img className={styles.smallIcon} src={twitterIcon} alt={'My Twitter account'} />
                </a>
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
