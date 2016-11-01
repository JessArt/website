import React, { Component } from 'react';

// components declaration
import PageFrame from '../page';

// style declaration
import './style.css';
import styles from './style.css.json';

export default class AboutPage extends Component {
  render() {
    return (
      <PageFrame small>
        <div className={styles.container}>
          <h2 className={styles.title}>
            {'Bonjour!'}
          </h2>
          <div className={styles.paragraph}>
            {`This website is dedicated to showcasing the projects and travels of me, Jess Zaikova.
  I'm an artist, musician, and seamstress with a love of all things creative. Beauty can be found in all things big, small, dark, and bright; and I love to express that through mediums such as photography, paint, yarn, song, and the written word.`}
          </div>
          <div className={styles.paragraph}>
            {`I've been a traditional artist for as long as I've been a human being and have been a photographer since my teenage years when I decided my hero in life was Linda McCartney. Music has been a passion that I express mostly through guitar covers and singing along to the classics, but I have written a song or two and how to write more.`}
          </div>
          <div className={styles.paragraph}>
            {`When I'm not creating the more traditional arts, crafts and sewing are my calling. Creating patterns for dresses I've seen in old classic films or just knitting along to something I liked on the internet, I'm never without a new working creation.`}
          </div>
          <div className={styles.paragraph}>
            {`Travel is another joy in my life and I plan to share stories of my journeys and aspirations here, showing off my travel photography along the way.`}
          </div>
          <div className={styles.paragraph}>
            {`With this website, I have a space to collect and organise all that is me. For my enjoyment and that of others.`}
          </div>
        </div>
      </PageFrame>
    );
  }
}
