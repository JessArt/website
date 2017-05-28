import React, { Component } from 'react'

// style declaration
import styles from './style.sass'

export default class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={'container'}>
          <div className={styles.content}>
            {'Copyright Jess Zaikova '}
            {(new Date()).getFullYear()}
          </div>
          <div>
            <a className={styles.email} href={'mailto:jess.zaikova@gmail.com'}>
              {'jess.zaikova@gmail.com'}
            </a>
            {' for all queries'}
          </div>
        </div>
      </div>
    )
  }
}
