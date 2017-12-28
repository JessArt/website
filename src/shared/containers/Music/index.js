import React, { Component } from "react";

// components declaration
import PageFrame from "../page";
import Poster from "../../components/poster";

// utils declaration
import { autobind } from "core-decorators";

// style declaration

import styles from "./style.sass";

import musicImage from "./images/music.jpg";
import subscribeImage from "./images/subscribe.png";

export default class MusicPage extends Component {
  @autobind
  createRef(node) {
    this._paragraph = node;
  }

  @autobind
  learnMore() {
    if (this._paragraph) {
      this._paragraph.scrollIntoView();
    } else {
      window.scrollBy(0, 500);
    }
  }

  createMeta() {
    const title = "Jess' Music";
    const description =
      "My favourite covers with chords on screen and how to play them";
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords:
            "jess zaikova, how to play, music, guitar, tutorial, youtube, bio, order prints, travel, photo, art"
        },
        itemProp: {
          name: title,
          description,
          image: "https://static.jess.gallery/music_og.jpg"
        },
        property: {
          "og:title": title,
          "og:url": "https://jess.gallery/music",
          "og:image": "https://static.jess.gallery/music_og.jpg",
          "og:image:type": "image/jpeg",
          "og:description": description,
          "twitter:card": "summary_large_image",
          "twitter:site": "@jesszaikova",
          "twitter:creator": "@jesszaikova",
          "twitter:url": "https://jess.gallery/music",
          "twitter:title": title,
          "twitter:description": description,
          "twitter:image": "https://static.jess.gallery/music_og.jpg"
        }
      },
      auto: {
        ograph: true
      }
    };

    return meta;
  }

  render() {
    const meta = this.createMeta();
    const text =
      "I started playing the guitar when I was 7 years old. My dad taught me a few chords and bought me a 3/4 acoustic. I loved it. Then I decided that I wanted to be a bassist, but, bass music just isn't as interesting when you don't have a band, so I got myself a drumset (not a group of friends) and started doing multi-track recordings of my own one-person band. Turns out a lot of people want to be guitar players so I taught my friends some of what I knew and, eventually, started making my own tutorial videos on some of my favourite songs. Tutorial videos without all the unneccessary talk, I might add. My collection of musical instruments is currently an ocean away, but I still have some old videos to upload until I can figure out how to rebuild my militia. Then I'll get back to making my recordings.";
    return (
      <PageFrame small wide meta={meta}>
        <Poster image={musicImage}>
          <div className={styles.container}>
            <div className={styles.description}>{text}</div>
            <a
              className={styles.subscribeLink}
              href="https://www.youtube.com/channel/UCCHXfmeq3OgXKfY0Gqp1-dA"
              target="_blank"
            >
              <img
                className={styles.subscribe}
                src={subscribeImage}
                alt={"My music channel"}
              />
            </a>
          </div>
          <div className={styles.learn} onClick={this.learnMore}>
            {"Learn more about me"}
          </div>
        </Poster>
        <div className={`${styles.list} container`} ref={this.createRef}>
          <h2>List of my tutorials:</h2>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/UnqtLhuiGlQ"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/PlM-JwNLYDY"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/93efenoGLQ0"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/x7F6PjTS7AU"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/8KVlhpn3eYc"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/UPbLyC781Ec"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/74_b4caAvQg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/Jy-LYvDh07o"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/AcmnV2cf3qo"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/B3A2EWAZo5s"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/gcXm28KyDuQ"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/bpwFBB-LN9U"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className={styles.elemContainer}>
            <iframe
              className={styles.elem}
              src="https://www.youtube.com/embed/2s3VQnHM7vo"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </PageFrame>
    );
  }
}
