import React, { Component } from 'react'

import './style.css'
import styles from './style.css.json'

function checkEl({ collection, touched, element }) {
  const parent = element && element.parentElement
  const nextEl = parent && parent.nextElementSibling
  const nextElImage = nextEl && nextEl.firstElementChild

  // console.log(parent, nextEl, nextElImage)

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
  componentDidMount() {
    const images = this.ref.querySelectorAll('img')
    const touchedImages = []
    for (const image of images) {
      if (!touchedImages.includes(image)) {
        const { collection } = checkEl({ collection: [image], touched: touchedImages, element: image })

        if (collection.length > 1) {
          // console.log('111111', collection)
          this.createSlider(collection)
        }
      }
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
      <div ref={node => this.ref = node} dangerouslySetInnerHTML={{ __html: this.props.text }} />
    )
  }
}
