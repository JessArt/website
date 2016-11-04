import React, { Component } from 'react';

// components declaration
import { Link } from 'react-router';
import PageFrame from '../page';
import Poster from '../../components/poster';

// style declaration
import './style.css';
import styles from './style.css.json';

export default class NotFound extends Component {
  render() {
    return (
      <PageFrame small wide>
        <Poster image={'http://static.jess.gallery/c0e4abbc-aab0-4639-8c7b-63d478aa41d2_1200.jpg'}>
          <div className={styles.container}>
            <h2 className={styles.title}>
              Not found!
            </h2>
            <p className={styles.description}>
              {'Unfortunately, your path leads to the nowhere. It happens with all of us at some point of our life – don\'t give up!'}
            </p>
            <Link to={{ pathname: '/' }} className={styles.link}>
              {'Back to the main page'}
            </Link>
          </div>
        </Poster>
      </PageFrame>
    );
  }
}
