import React, { Component } from 'react';

// components declaration
import PageFrame from '../page';
import Poster from '../../components/poster';

// style declaration
import './style.css';
import styles from './style.css.json';

import musicImage from './images/music.jpg';
import subscribeImage from './images/subscribe.png';

export default class MusicPage extends Component {
  learnMore() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (this._paragraph) {
      this._paragraph.scrollIntoView();
    } else {
      window.scrollBy(0, 500);
    }
  }

  createMeta() {
    const title = 'Jess\' Music';
    const description = 'Tutorials and my story in music';
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'music, guitar, tutorial, youtube, bio'
        },
        itemProp: {
          name: title,
          description,
          image: 'http://static.jess.gallery/music_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': 'http://jess.gallery/music',
          'og:image': 'http://static.jess.gallery/music_og.jpg',
          'og:image:type': 'image/jpeg',
          'og:description': description
        }
      },
      auto: {
        ograph: true
      }
    }

    return meta
  }

  render() {
    const meta = this.createMeta()
    return (
      <PageFrame small wide meta={meta}>
        <Poster image={musicImage}>
          <div className={styles.container}>
            <div className={styles.description}>
              I started playing the guitar when I was 7 years old. My dad taught me a few chords and bought me a 3/4 acoustic. I loved it. Then I decided that I wanted to be a bassist, but, bass music just isn't as interesting when you don't have a band, so I got myself a drumset (not a group of friends) and started doing multi-track recordings of my own one-person band. Turns out a lot of people want to be guitar players so I taught my friends some of what I knew and, eventually, started making my own tutorial videos on some of my favourite songs. Tutorial videos without all the unneccessary talk, I might add.
              My collection of musical instruments is currently an ocean away, but I still have some old videos to upload until I can figure out how to rebuild my militia. Then I'll get back to making my recordings.
            </div>
            <a className={styles.subscribeLink} href="https://www.youtube.com/channel/UCCHXfmeq3OgXKfY0Gqp1-dA" target="_blank">
              <img className={styles.subscribe} src={subscribeImage} alt={'My music channel'} />
            </a>
          </div>
          <div className={styles.learn} onClick={this.learnMore.bind(this)}>
            {'Learn more about me'}
          </div>
        </Poster>
        <div className={`${styles.list} container`} ref={node => this._paragraph = node}>
          <h2>
            List of my tutorials:
          </h2>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/93efenoGLQ0" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/x7F6PjTS7AU" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/8KVlhpn3eYc" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/UPbLyC781Ec" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/74_b4caAvQg" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/Jy-LYvDh07o" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/AcmnV2cf3qo" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/B3A2EWAZo5s" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/gcXm28KyDuQ" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/bpwFBB-LN9U" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className={styles.elemContainer}>
            <iframe className={styles.elem} src="https://www.youtube.com/embed/2s3VQnHM7vo" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>

      </PageFrame>
    );
  }
}
