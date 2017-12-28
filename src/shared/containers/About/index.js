import React, { Component, PropTypes } from "react";

// components declaration
import PageFrame from "../page";
import Poster from "../../components/poster";
import Feedback from "../../components/feedback";
import Subscribe from "../../components/subscribe";

// utils declaration
import { autobind } from "core-decorators";

// style declaration

import styles from "./style.sass";

// assets declaration
import contactImage from "./images/contact1.jpg";

export default class AboutPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  @autobind
  learnMore() {
    // const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (this._paragraph) {
      this._paragraph.scrollIntoView();
    } else {
      // start from 0, from the same point
      const startScrolling = 0;
      // scroll by 500 down
      const endScrolling = 500;
      window.scrollBy(startScrolling, endScrolling);
    }
  }

  @autobind
  createRef(node) {
    this._paragraph = node;
  }

  createMeta() {
    const title = "All About Jess Zaikova";
    const description =
      "Story of my life and my hobbies, place to leave feedback";
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords:
            "jess zaikova, about, bio, story, feedback, contact, order prints"
        },
        itemProp: {
          name: title,
          description,
          image: "https://static.jess.gallery/contact_og.jpg"
        },
        property: {
          "og:title": title,
          "og:url": "https://jess.gallery/about",
          "og:image": "https://static.jess.gallery/contact_og.jpg",
          "og:image:type": "image/jpeg",
          "og:description": description,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery/about",
          "twitter:title": title,
          "twitter:description": description,
          "twitter:image": "https://static.jess.gallery/contact_og.jpg"
        }
      },
      auto: {
        ograph: true
      }
    };

    return meta;
  }

  render() {
    const { location: { query: { write } } } = this.props;
    const meta = this.createMeta();

    const titleString =
      "This website is dedicated to showcasing the projects and travels of me, Jess Zaikova. I'm an artist, musician, and seamstress with a love of all things creative. Beauty can be found in all things big, small, dark, and bright and I love to express that through mediums such as photography, paint, yarn, song, and the written word.";
    const firstParagraph =
      "I've been a traditional artist for as long as I've been a human being and have been a photographer since my teenage years when I decided my hero in life was Linda McCartney. Music has been a passion that I express mostly through guitar covers and singing along to the classics, but I have written a song or two and hope to write more.";
    const secondParagraph =
      "When I'm not creating the more traditional arts, crafts and sewing are my calling. Creating patterns for dresses I've seen in old classic films or just knitting along to something I liked on the internet, I'm never without a new working creation.";
    const thirdParagraph =
      "Travel is another joy in my life and I plan to share stories of my journeys and aspirations here, showing off my travel photography along the way.";
    const fourthParagraph =
      "With this website, I have a space to collect and organise all that is me. For my enjoyment and that of others.";

    return (
      <PageFrame small wide meta={meta}>
        <Poster image={contactImage}>
          <h2 className={styles.title}>{"Bonjour!"}</h2>
          <div className={styles.poster}>
            <div className={styles.description}>
              <div className={styles.paragraph}>{titleString}</div>
            </div>
            <div className={styles.feedback}>
              <h4 className={styles.feedbackTitle}>
                {"Drop me a line for orders, info, or just to say hey!"}
              </h4>
              <Feedback focus={write} />
            </div>
          </div>
          <div className={styles.learn} onClick={this.learnMore}>
            {"Learn more about me"}
          </div>
        </Poster>
        <div className={styles.container}>
          <div className={styles.paragraph} ref={this.createRef}>
            {firstParagraph}
          </div>
          <div className={styles.paragraph}>{secondParagraph}</div>
          <div className={styles.paragraph}>{thirdParagraph}</div>
          <div className={styles.paragraph}>{fourthParagraph}</div>
          <Subscribe />
        </div>
      </PageFrame>
    );
  }
}
