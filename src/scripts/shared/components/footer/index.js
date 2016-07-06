import React, { Component } from 'react'

// style declaration
import styles from './style.css.json'
import './style.css'

export default class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={'container'}>
          <div>
            {'Copyright Jess Zaikova '}
            {(new Date()).getFullYear()}
          </div>
          <div>
            <a className={styles.email} href={'mailto:business@jess.gallery'}>
              {'business@jess.gallery'}
            </a>
            {' for all queries'}
          </div>
        </div>
      </div>
    )
  }
}
