import React, { Component, PropTypes } from 'react'

import './style.css'
import styles from './style.css.json'

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    type: PropTypes.string
  };

  render() {
    const { children, className, ...props } = this.props

    return (
      <button className={`${styles.button} ${className ? className : ''}`} {...props}>
        {children}
      </button>
    )
  }
}
