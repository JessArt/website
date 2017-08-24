import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'

// style declaration

import styles from './style.sass'

export default class Media extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { item } = this.props

    const to = { pathname: `/media/${item.ID}`, query: { type: item.Type } }
    return (
      <div className={styles.container}>
        <Link className={styles.link} to={to}>
          <img className={styles.image} alt={item.Title} src={item.SmallURL} />
          <div className={styles.overlay}>
            <div className={styles.title}>
              {item.Title}
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
