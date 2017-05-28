import React, { Component } from 'react'

// utils declaration
import { autobind } from 'core-decorators'

// styles declaration

import styles from './style.sass'

function checkEl({ collection, touched, element }) {
  const parent = element && element.parentElement
  const nextEl = parent && parent.nextElementSibling
  const nextElImage = nextEl && nextEl.firstElementChild

  if (nextElImage && nextElImage.tagName === 'IMG') {
    touched.push(nextElImage)
    return checkEl({
      collection: collection.concat(nextElImage),
      touched,
      element: nextElImage
    })
  }

  return { collection, touched }
}

export default class Article extends Component {
  @autobind
  clean() {
    this.openedImg.classList = styles.magnified
    this.img.classList += ` ${styles.fading}`

    setTimeout(() => {
      this.img.classList = styles.magnifiedContainer
      this.img.innerHTML = ''

      this.openedImg.removeEventListener('click', this.clean)
      this.openedImg = undefined
    }, 150)
  }

  @autobind
  magnify(e) {
    this.img.classList += ` ${styles.active}`
    // console.log(e)
    const img = e.target

    const newImg = document.createElement('img')
    newImg.src = img.src
    newImg.classList = styles.magnified
    this.openedImg = newImg

    setTimeout(() => {
      newImg.classList += ` ${styles.active}`
    }, 0)

    newImg.addEventListener('click', this.clean)

    this.img.appendChild(newImg)
  }

  componentDidMount() {
    const magnifiedContainer = document.createElement('div')
    magnifiedContainer.classList = styles.magnifiedContainer
    this.img = magnifiedContainer
    document.body.appendChild(magnifiedContainer)
    this.imgs = []
    const images = this.ref.querySelectorAll('img')
    const touchedImages = []
    for (const image of images) {
      // check if it is first in the row – to pack them in a row
      if (!touchedImages.includes(image)) {
        const { collection } = checkEl({
          collection: [image],
          touched: touchedImages,
          element: image
        })

        if (collection.length > 1) {
          this.createSlider(collection)
        }
      }

      // add magnify handler
      image.addEventListener('click', this.magnify)
      this.imgs.push(image)
    }
  }

  componentWillUnmount() {
    this.imgs.forEach(image => image.removeEventListener('click', this.magnify))
    if (this.openedImg) {
      this.openedImg.removeEventListener('click', this.clean)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  createSlider(images) {
    const slider = document.createElement('div')
    slider.className = styles.slider
    const beforeLink = images[0].parentElement
    const articleParent = beforeLink.parentElement
    images.forEach(image => {
      const wrapper = document.createElement('div')
      wrapper.className = styles.imageWrapper
      wrapper.appendChild(image)
      slider.appendChild(wrapper)
    })
    articleParent.insertBefore(slider, beforeLink)
  }

  render() {
    return (
      <div>
        <div ref={node => this.ref = node} dangerouslySetInnerHTML={{ __html: this.props.text }} />
      </div>
    )
  }
}
