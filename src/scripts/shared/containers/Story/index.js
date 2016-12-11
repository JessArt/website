/* global __SERVER__ */

import React, { Component } from 'react'

import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import Loader from '../../components/loader'
import StorySlider from '../../components/story-slider'
import Sharing from '../../components/sharing'
import Disqus from '../../components/disqus'

// style declaration
import './style.css'
import styles from './style.css.json'

@observer(['stories'])
export default class StoryPage extends Component {
  componentDidMount() {
    const { stories, params: { id } } = this.props

    stories.fetchStory(id)
  }

  static willRender(stores, props) {
    const { params: { id } } = props
    return stores.stories.fetchStory(id)
  }

  renderStory(story) {
    const { location: { pathname } } = this.props
    const url = `https://jess.gallery${pathname}`
    return (
      <div>
        <div className={styles.storyContainer} style={{ backgroundImage: `url(${story.Cover})` }}>
          <div className={'container'}>
            <h1 className={styles.title}>
              {story.Title}
            </h1>
            <div className={styles.description}>
              {story.Description}
            </div>
            <div className={styles.sharing}>
              <Sharing url={url} text={story.Title} />
            </div>
          </div>
        </div>
        <StorySlider images={(story.Images || [])} />
        <div className={'container'} style={{ background: '#fff' }}>
          <div className={styles.commentaries}>
            {!__SERVER__ && <Disqus id={`collections/${story.ID}`} url={url} title={story.Title} />}
          </div>
        </div>
      </div>
    )
  }

  createMeta() {
    const { stories, params: { id } } = this.props
    const story = stories.getStory(id)

    if (story) {
      const url = `https://jess.gallery/collections/${story.ID}`
      const image = story.Cover
      const metaTitle = story.MetaTitle || story.Title
      const metaDescription = story.MetaDescription || story.Description || 'Cities around the world; cemeteries; churches; and anything else that catches my attention' // eslint-disable-line
      const meta = {
        title: metaTitle,
        description: metaDescription,
        meta: {
          name: {
            keywords: story.Keywords
          },
          itemProp: {
            name: metaTitle,
            description: metaDescription,
            image: image
          },
          property: {
            'og:title': metaTitle,
            'og:url': url,
            'og:image': image,
            'og:image:type': 'image/jpeg',
            'og:description': metaDescription,
            'twitter:card': 'summary_large_image',
            'twitter:site': '@jesszaikova',
            'twitter:creator': '@jesszaikova',
            'twitter:url': url,
            'twitter:title': metaTitle,
            'twitter:description': metaDescription,
            'twitter:image': image
          }
        },
        auto: {
          ograph: true
        }
      }

      if (item.OriginalWidth && item.OriginalHeight) {
        meta.meta.property['og:image:width'] = 500
        meta.meta.property['og:image:height'] = 500 / (item.OriginalWidth / item.OriginalHeight)
      }

      return meta
    }
  }

  render() {
    const { stories, params: { id } } = this.props

    const isLoading = stories.isStoryLoading(id)
    const story = stories.getStory(id)

    return (
      <PageFrame wide>
        {(isLoading || !story) && <Loader />}
        {story && this.renderStory(story)}
      </PageFrame>
    )
  }
}
