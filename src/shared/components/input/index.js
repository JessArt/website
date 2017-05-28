import React, { Component } from 'react'


import styles from './style.sass'

export default class Input extends Component {
  render() {
    const { className, error, dark, ...props } = this.props
    const resultClassName = `
      ${styles.input}
      ${className}
      ${error ? styles.error : ''}
      ${dark ? styles.dark : ''}
    `

    return (
      <input className={resultClassName} {...props} />
    )
  }
}
