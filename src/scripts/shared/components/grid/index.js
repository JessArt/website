import React, { Component, PropTypes } from 'react';

// style declaration
import './styles.css';
import styles from './styles.css.json';

export default class Grid extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
  };

  render() {
    const { children } = this.props;
    const wrappedChildren = React.Children.map(children, (child) => {
      return (
        <div className={styles.element}>
          {child}
        </div>
      );
    });

    return (
      <div className={styles.container}>
        {wrappedChildren}
      </div>
    );
  }
}
