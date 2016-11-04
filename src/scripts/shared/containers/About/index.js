import React, { Component } from 'react';

// components declaration
import PageFrame from '../page';
import Poster from '../../components/poster';
import Feedback from '../../components/feedback';

// style declaration
import './style.css';
import styles from './style.css.json';

// assets declaration
import contactImage from './images/contact1.jpg';

export default class AboutPage extends Component {
  learnMore() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (this._paragraph) {
      this._paragraph.scrollIntoView();
    } else {
      window.scrollBy(0, 500);
    }
  }

  createMeta() {
    const title = 'All About Jess';
    const description = 'Story of my life and my hobbies, place to leave feedback';
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'about, bio, story, feedback, contact'
        },
        itemProp: {
          name: title,
          description,
          image: 'http://static.jess.gallery/contact_og.jpg'
        },
        property: {
          'og:title': title,
          'og:url': 'http://jess.gallery/about',
          'og:image': 'http://static.jess.gallery/contact_og.jpg',
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
        <Poster image={contactImage}>
          <h2 className={styles.title}>
            {'Bonjour!'}
          </h2>
          <div className={styles.poster}>
            <div className={styles.description}>
              <div className={styles.paragraph}>
                {`This website is dedicated to showcasing the projects and travels of me, Jess Zaikova.
      I'm an artist, musician, and seamstress with a love of all things creative. Beauty can be found in all things big, small, dark, and bright; and I love to express that through mediums such as photography, paint, yarn, song, and the written word.`}
              </div>
            </div>
            <div className={styles.feedback}>
              <h4 className={styles.feedbackTitle}>
                {'Drop me a line!'}
              </h4>
              <Feedback />
            </div>
          </div>
          <div className={styles.learn} onClick={this.learnMore.bind(this)}>
            {'Learn more about me'}
          </div>
        </Poster>
        <div className={styles.container}>
          <div>
          </div>
          <div className={styles.paragraph} ref={node => this._paragraph = node}>
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
