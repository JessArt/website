import React, { Component, PropTypes } from 'react'

// style declaration
import styles from './style.css.json'
import './style.css'

// assets declaration
import artImage from './images/art.jpg'
import photoImage from './images/photo.jpg'
import blogImage from './images/blog.jpg'
import contactImage from './images/contact.jpg'

const config = {
  art: {
    image: artImage,
    title: 'Traditional Art',
    description: 'A wide variety of mediums such as graphite, charcoal, pastel, marker, ink, oil, and watercolour used to create realistic portraits and cityscapes. Drawings done in many different styles and techniques. Many drawings are filmed to create one-of-a-kind speed-drawing videos.'
  },
  photo: {
    image: photoImage,
    title: 'Photography',
    description: 'Wedding photography; portraits for high school, deployment, and family; concert photography; as well as a large collection of cityscape and landscape photography of North America, Europe, and Asia. Photoshoots can also lead to references for drawings of special moments.'
  },
  blog: {
    image: blogImage,
    title: 'Progress',
    description: 'Visit tumblr or facebook to watch the progress of my art from sketches to finished pieces.'
  },
  contact: {
    image: contactImage,
    title: 'Contacts',
    description: 'Contact me by e-mail or through facebook to set up a commission for a drawing, photoshoot, or combination of both.'
  }
}

export default class PromoSection extends Component {
  render () {
    const { position, style, type } = this.props
    const { image, title, description } = config[type]
    return (
      <div className={`${styles.container} ${styles[style]}`}>
        <div className={`${styles.logoContainer} ${styles[position]}`}>
          <img className={styles.image} src={image} />
         </div>
        <div className={`${styles.textContainer} ${styles[position]} ${styles[style]}`}>
          <h4 className={styles.title}>
            {title}
          </h4>
          <p className={styles.description}>
            {description}
          </p>
        </div>
      </div>
    )
  }
}

PromoSection.propTypes = {
  position: PropTypes.oneOf([
    'left',
    'right'
  ]),
  style: PropTypes.oneOf([
    'bright',
    'dark'
  ]),
  type: PropTypes.oneOf([
    'art',
    'photo',
    'blog',
    'contact'
  ])
}
