import React, { Component, PropTypes } from 'react'

// components declaration
import { Link } from 'react-router'

// style declaration
import styles from './style.sass'


// assets declaration
import artImage from './images/art.jpg'
import photoImage from './images/photo2.jpg'
import blogImage from './images/blog.jpg'
import contactImage from './images/contact2.jpg'

const config = {
  art: {
    link: '/art',
    image: artImage,
    title: 'Traditional Art',
    description: 'A wide variety of mediums such as graphite, charcoal, pastel, marker, ink, oil, and watercolour used to create realistic portraits and cityscapes. Drawings done in many different styles and techniques. Many drawings are filmed to create one-of-a-kind speed-drawing videos.'
  },
  photo: {
    link: '/photo',
    image: photoImage,
    title: 'Photography',
    description: 'Wedding photography; portraits for high school, deployment, and family; concert photography; as well as a large collection of cityscape and landscape photography of North America, Europe, and Asia. Photoshoots can also lead to references for drawings of special moments.'
  },
  blog: {
    link: 'https://www.facebook.com/jesszaikova',
    image: blogImage,
    title: 'Progress',
    description: 'Visit tumblr or facebook to watch the progress of my art from sketches to finished pieces.'
  },
  contact: {
    link: '/about',
    image: contactImage,
    title: 'Contacts',
    description: 'Contact me by e-mail or through facebook to set up a commission for a drawing, photoshoot, or combination of both.'
  }
}

export default class PromoSection extends Component {
  render () {
    const { position, style, type } = this.props
    const { image, title, description, link } = config[type]

    const visibleMarkup = (
      <div className={styles.smallWrapper}>
        <div className={`${styles.smallContainer} ${styles[style]}`}>
          <div className={styles.smallImgeContainer}>
            <img className={styles.smallImage} src={image} />
           </div>
           <h4 className={`${styles.smallTitle} ${styles[style]}`}>
             {title}
           </h4>
        </div>
      </div>
    )

    const invisibleMarkup = (
      <div className={styles.expand}>
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
      </div>
    )

    return link.startsWith('http') ? (
      <a className={styles.wrapper} href={link} target="_blank">
        {visibleMarkup}
        {invisibleMarkup}
      </a>
    ) : (
      <Link to={{ pathname: link }} className={styles.wrapper}>
        {visibleMarkup}
        {invisibleMarkup}
      </Link>
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
