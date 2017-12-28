import React, { Component } from "react";
import RPT from "prop-types";

import styles from "./style.sass";

export default class Button extends Component {
  static propTypes = {
    children: RPT.node,
    type: RPT.string,
    className: RPT.string
  };

  render() {
    const { children, className, ...props } = this.props;

    return (
      <button
        className={`${styles.button} ${className ? className : ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
}
