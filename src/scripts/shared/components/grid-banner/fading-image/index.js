import React, { Component, PropTypes } from 'react';

// style declaration
import './style.css';
import styles from './style.css.json';

export default class FadingImage extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  state = {
    lastURL: null,
    lastOpacity: 0,
    newOpacity: 1
  };

  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      this.setState({
        lastURL: this.props.url,
        lastOpacity: 1,
        newOpacity: 0
      }, () => {
        setTimeout(() => {
          this.setState({
            lastOpacity: 0,
            newOpacity: 1
          });
        }, 0);
      });
    }
  }

  render() {
    const { lastURL, lastOpacity, newOpacity } = this.state;
    const { url } = this.props;

    return (
      <div className={styles.container}>
        <img className={styles.currentImage} src={url} style={{ opacity: newOpacity, transition: 'opacity 0.3s' }} />
        {lastURL && <img className={styles.lastImage} src={lastURL} style={{ opacity: lastOpacity, transition: 'opacity 0.3s' }} />}
      </div>
    )
  }
}
