import React, { Component, PropTypes } from 'react';

// components declaration
import { Link } from 'react-router';

// style declaration
import './style.css';
import styles from './style.css.json';

export default class Media extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;

    return (
      <div className={styles.container}>
        <Link className={styles.link} to={{ pathname: `/media/${item.id}`, query: { type: item.type } }}>
          <img className={styles.image} alt={item.title} src={item.small_url} />
          <div className={styles.overlay}>
            <div className={styles.title}>
              {item.title}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
