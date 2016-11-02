import React, { Component, PropTypes } from 'react';

// components declaration
import { Link } from 'react-router';
import FadingImage from './fading-image';

// style declaration
import './style.css';
import styles from './style.css.json';

// utility declaration
import { random, shuffle, sample } from 'lodash';

export default class GridBanner extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  state = {
    number: 25
  };

  componentDidMount() {
    this.startTransition();
  }

  startTransition() {
    clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.forceUpdate();
      this.startTransition();
    }, 2225000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  rearrange() {
    this.forceUpdate(() => {
      this.startTransition();
    });
  }

  changeImages(number) {
    let newNumber = this.state.number + number;

    if (newNumber < 5) {
      newNumber = 5;
    }

    if (newNumber > 50) {
      newNumber = 50;
    }
    this.setState({
      number: newNumber
    });
  }

  renderMobileVersion(items) {
    const item = sample(items)
    return (
      <div className={styles.mobileContainer} onClick={this.rearrange.bind(this)}>
        <FadingImage url={sample(items).small_url} />
      </div>
    );
  }

  render() {
    const { number } = this.state;
    const { items } = this.props;
    const processedItems = shuffle(items)
      .filter(x => Boolean(x.originalWidth) && x.originalWidth > x.originalHeight)
      .slice(0, number)

    const images = processedItems.map((item, i) => {
        const leftPosition = random(0, 80);
        const topPosition = random(0, 250);
        const width = random(150, 250);

      return (
        <Link to={{ pathname: `/media/${item.id}`, query: { type: item.type }}}
          className={styles.elem} key={`grid_banner_${i}`}
          style={{ left: `${leftPosition}%`, top: `${topPosition}px`, width: `${width}px`}}>
          <img className={styles.image} src={item.small_url} alt={item.title} />
        </Link>
      );
    });

    return (
      <div>
        {this.renderMobileVersion(processedItems)}
        <div className={styles.container}>
          {images}
          <div className={styles.rearrange}>
            <div onClick={this.changeImages.bind(this, -1)}>
              Remove one image
            </div>
            <div onClick={this.rearrange.bind(this)}>
              Click to rearrange
            </div>
            <div onClick={this.changeImages.bind(this, 1)}>
              Add one image
            </div>
          </div>
        </div>
      </div>
    );
  }
}
