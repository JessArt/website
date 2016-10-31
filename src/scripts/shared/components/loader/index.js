import React, { Component, PropTypes } from 'react';

// style declaration
import './style.css';
import styles from './style.css.json'

export default class Loader extends Component {
  static propTypes = {
    white: PropTypes.bool
  };

  render() {
    const { white } = this.props;

    return (
      <div className={`${styles.container} ${white ? styles.white : ''}`}>
        <div className={`${styles.cube} ${styles.cube1}`}></div>
        <div className={`${styles.cube} ${styles.cube2}`}></div>
        <div className={`${styles.cube} ${styles.cube3}`}></div>
        <div className={`${styles.cube} ${styles.cube4}`}></div>
        <div className={`${styles.cube} ${styles.cube5}`}></div>
        <div className={`${styles.cube} ${styles.cube6}`}></div>
        <div className={`${styles.cube} ${styles.cube7}`}></div>
        <div className={`${styles.cube} ${styles.cube8}`}></div>
        <div className={`${styles.cube} ${styles.cube9}`}></div>
      </div>
    );
  }
}