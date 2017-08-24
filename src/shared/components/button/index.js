import React, { Component, PropTypes } from 'react'

import styles from './style.sass'

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
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
