import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'

// style declaration
import styles from './style.css.json'
import './style.css'

// assets declaration
import fbIcon from './images/fb.png'
import flickrIcon from './images/flickr.png'
import tumblrIcon from './images/tumblr.png'
import twitterIcon from './images/twitter.png'

export default class Header extends Component {
  static propTypes = {
    small: PropTypes.bool
  };

  state = {
    menu: false
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  renderBigHeader() {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <Link className={styles.titleLink} to={{ pathname: '/' }}>
                <div className={'container'}>
                  <span className={styles.colored}>
                    {'Jess'}
                  </span>
                  <span className={styles.noncolored}>
                    {'Zaikova'}
                  </span>
                </div>
              </Link>
            </h2>
          </div>
        </div>
        <div className={styles.linksContainer}>
          <div className={`${styles.links} container`}>
            <div className={styles.internal}>
              <Link to={{ pathname: '/art' }} className={styles.link}>
                {'Art'}
              </Link>
              <Link to={{ pathname: '/photo' }} className={styles.link}>
                {'Photography'}
              </Link>
              <Link to={{ pathname: '/music' }} className={styles.link}>
                {'Music'}
              </Link>
              <Link to={{ pathname: '/about' }} className={styles.link}>
                {'About'}
              </Link>
            </div>
            <div className={styles.external}>
              <a className={styles.iconContainer} href={'http://jessellisart.tumblr.com'} target={'_blank'}>
                <img className={styles.icon} src={tumblrIcon} alt={'My Tumbler account'} />
              </a>
              <a className={styles.iconContainer} href={'https://www.facebook.com/jessellisart'} target={'_blank'}>
                <img className={styles.icon} src={fbIcon} alt={'My Facebook account'} />
              </a>
              <a className={styles.iconContainer} href={'http://www.flickr.com/jessellisart'} target={'_blank'}>
                <img className={styles.icon} src={flickrIcon} alt={'My Flickr account'} />
              </a>
              <a className={styles.iconContainer} href={'http://www.twitter.com/jessellisart'} target={'_blank'}>
                <img className={styles.icon} src={twitterIcon} alt={'My Twitter account'} />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSmallHeader() {
    const { menu } = this.state;

    return (
      <div className={styles.smallHeader}>
        <div className={`${styles.hamburger} ${menu ? styles.active: ''}`} onClick={this.toggleMenu.bind(this)}>
          <span></span>
          <span></span>
          <span></span>
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
          <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/music' }}>
            {'Music'}
          </Link>
          <Link className={styles.smallLink} activeClassName={styles.active} to={{ pathname: '/about' }}>
            {'About'}
          </Link>
        </div>
        <div className={styles.smallExternal}>
          <a className={styles.smallIconContainer} href={'http://jessellisart.tumblr.com'} target={'_blank'}>
            <img className={styles.smallIcon} src={tumblrIcon} alt={'My Tumbler account'} />
          </a>
          <a className={styles.smallIconContainer} href={'https://www.facebook.com/jessellisart'} target={'_blank'}>
            <img className={styles.smallIcon} src={fbIcon} alt={'My Facebook account'} />
          </a>
          <a className={styles.smallIconContainer} href={'http://www.flickr.com/jessellisart'} target={'_blank'}>
            <img className={styles.smallIcon} src={flickrIcon} alt={'My Flickr account'} />
          </a>
          <a className={styles.smallIconContainer} href={'http://www.twitter.com/jessellisart'} target={'_blank'}>
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
              <Link className={styles.smallLink} to={{ pathname: '/about' }}>
                {'About me'}
              </Link>
            </div>
            <div className={`${styles.menuRow} ${styles.list}`}>
              <a className={styles.smallIconContainer} href={'http://jessellisart.tumblr.com'} target={'_blank'}>
                <img className={styles.smallIcon} src={tumblrIcon} alt={'My Tumbler account'} />
              </a>
              <a className={styles.smallIconContainer} href={'https://www.facebook.com/jessellisart'} target={'_blank'}>
                <img className={styles.smallIcon} src={fbIcon} alt={'My Facebook account'} />
              </a>
              <a className={styles.smallIconContainer} href={'http://www.flickr.com/jessellisart'} target={'_blank'}>
                <img className={styles.smallIcon} src={flickrIcon} alt={'My Flickr account'} />
              </a>
              <a className={styles.smallIconContainer} href={'http://www.twitter.com/jessellisart'} target={'_blank'}>
                <img className={styles.smallIcon} src={twitterIcon} alt={'My Twitter account'} />
              </a>
            </div>
          </div>}
      </div>
    );
  }

  render () {
    const { small } = this.props;

    return small ? this.renderSmallHeader() : this.renderBigHeader();
  }
}
