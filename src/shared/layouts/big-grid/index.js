import React, { Component } from 'react'
import styles from './style.sass'
import { Link } from 'react-router'

export default class BigGrid extends Component {
  renderElements() {
    return (this.props.elements || []).map(element => {
      return (
        <Link
          className={styles.elem}
          key={element.id}
          to={element.link}>
          <img className={styles.elemImage} src={element.img} />
          <div className={styles.elemContent}>
            <h4 className={styles.elemTitle}>
              {element.title}
            </h4>
            <div className={styles.elemSubtitle}>
              {element.subtitle}
            </div>
          </div>
        </Link>
      )
    })
  }
  
  render() {
    return (
      <div className={styles.grid}>
        {this.renderElements()}
      </div>
    )
  }
}
