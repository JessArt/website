import React, { Component } from 'react'

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
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <div className={'container'}>
                <span className={styles.colored}>
                  {'Jess'}
                </span>
                <span>
                  {'Zaikova'}
                </span>
              </div>
            </h2>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.internal}>
            <Link to={{ pathname: '/art' }} className={styles.link}>
              {'Art'}
            </Link>
            <Link to={{ pathname: '/photo' }} className={styles.link}>
              {'Photography'}
            </Link>
            <Link to={{ pathname: '/bio' }} className={styles.link}>
              {'Bio'}
            </Link>
            <Link to={{ pathname: '/contact' }} className={styles.link}>
              {'Contact'}
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
    )
  }
}
