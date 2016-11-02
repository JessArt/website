import React, { Component, PropTypes } from 'react';

// style declaration
import './style.css';
import styles from './style.css.json';

// utility declaration
import { preload } from 'pic-loader';

export default class FadingImage extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentURL: props.url,
      lastURL: null,
      lastOpacity: 0,
      newOpacity: 1
    };
  }

  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      preload(props.url);
      this.setState({
        lastURL: this.props.url,
        lastOpacity: 1,
      }, () => {
        setTimeout(() => {
          this.setState({
            newOpacity: 0
          }, () => {
            setTimeout(() => {
              this.setState({
                newOpacity: 1,
                lastOpacity: 0,
                currentURL: props.url
              });
            }, 100)
          });
        }, 100);
      });
    }
  }

  render() {
    const { lastURL, lastOpacity, newOpacity, currentURL } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.currentImage} src={currentURL} style={{ opacity: newOpacity, transition: newOpacity === 0 ? 'none' : 'opacity 0.3s' }} />
        <img className={styles.lastImage} src={lastURL} style={{ opacity: lastOpacity, transition: lastOpacity === 1 ? 'none' : 'opacity 0.3s' }} />
      </div>
    )
  }
}
