/* global __SERVER__ */

import React, { Component } from 'react'

// redux declaration
import { connect } from 'react-redux'
import { actions, selectors } from '../../../shared/store/redux'

// components declaration
import PageFrame from '../page'
import Loader from '../../components/loader'
import StorySlider from '../../components/story-slider'
import Sharing from '../../components/sharing'
import Disqus from '../../components/disqus'

// style declaration
import styles from './style.sass'

const mapStateToProps = (state, props) => ({
  storyData: selectors.api.story(state, { id: props.params.id })
})

const mapDispatchToProps = {
  fetchStory: actions.api.story
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StoryPage extends Component {
  componentWillMount() {
    const { fetchStory, params: { id } } = this.props

    fetchStory({ id })
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

  createMeta(story) {
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

      return meta
    }
  }

  render() {
    const { storyData } = this.props

    const isLoading = storyData.isPending
    const story = storyData.data

    const meta = this.createMeta(story)

    return (
      <PageFrame wide meta={meta}>
        {(isLoading || !story) && <Loader />}
        {story && this.renderStory(story)}
      </PageFrame>
    )
  }
}
