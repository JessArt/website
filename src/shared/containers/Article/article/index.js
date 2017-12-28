import React, { Component } from "react";

// utils declaration
import { autobind } from "core-decorators";

// styles declaration
import styles from "./style.sass";

function getNextEl(element) {
  if (
    element &&
    element.nextElementSibling &&
    element.nextElementSibling.tagName === "IMG"
  ) {
    return element.nextElementSibling;
  }

  const parent = element && element.parentElement;
  const nextEl = parent && parent.nextElementSibling;

  if (nextEl && nextEl.tagName === "IMG") {
    return nextEl;
  }

  const nextElChild = nextEl && nextEl.firstElementChild;

  if (nextElChild && nextElChild.tagName === "IMG") {
    return nextElChild;
  }
}

function checkEl({ collection, touched, element }) {
  const nextEl = getNextEl(element);

  if (nextEl) {
    touched.push(nextEl);
    return checkEl({
      collection: collection.concat(nextEl),
      touched,
      element: nextEl
    });
  }

  return { collection, touched };
}

export default class Article extends Component {
  @autobind
  clean() {
    this.openedImg.classList = styles.magnified;
    this.img.classList += ` ${styles.fading}`;

    setTimeout(() => {
      this.img.classList = styles.magnifiedContainer;
      this.img.innerHTML = "";

      this.openedImg.removeEventListener("click", this.clean);
      this.openedImg = undefined;
    }, 150);
  }

  @autobind
  magnify(e) {
    this.img.classList += ` ${styles.active}`;
    const img = e.target;

    const newImg = document.createElement("img");
    newImg.src = img.src;
    newImg.classList = styles.magnified;
    this.openedImg = newImg;

    setTimeout(() => {
      newImg.classList += ` ${styles.active}`;
    }, 0);

    newImg.addEventListener("click", this.clean);

    this.img.appendChild(newImg);
  }

  componentDidMount() {
    const magnifiedContainer = document.createElement("div");
    magnifiedContainer.classList = styles.magnifiedContainer;
    this.img = magnifiedContainer;
    document.body.appendChild(magnifiedContainer);
    this.imgs = [];
    const images = this.ref.querySelectorAll("img");
    const touchedImages = [];
    for (const image of images) {
      // check if it is first in the row – to pack them in a row
      if (!touchedImages.includes(image)) {
        const { collection } = checkEl({
          collection: [image],
          touched: touchedImages,
          element: image
        });

        if (collection.length > 1) {
          this.createSlider(collection);
        }
      }

      // add magnify handler
      image.addEventListener("click", this.magnify);
      this.imgs.push(image);
    }
  }

  componentWillUnmount() {
    this.imgs.forEach(image =>
      image.removeEventListener("click", this.magnify)
    );
    if (this.openedImg) {
      this.openedImg.removeEventListener("click", this.clean);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  createSlider(images) {
    const slider = document.createElement("div");
    slider.className = styles.slider;
    const lastElement = images[images.length - 1];
    const beforeLink = lastElement.nextElementSibling
      ? lastElement.nextElementSibling
      : lastElement.parentElement;
    const articleParent = beforeLink.parentElement;
    images.forEach(image => {
      const wrapper = document.createElement("div");
      wrapper.className = styles.imageWrapper;
      wrapper.appendChild(image);
      slider.appendChild(wrapper);
    });
    articleParent.insertBefore(slider, beforeLink);
  }

  render() {
    return (
      <div>
        <div
          ref={node => (this.ref = node)}
          dangerouslySetInnerHTML={{ __html: this.props.text }}
        />
      </div>
    );
  }
}
