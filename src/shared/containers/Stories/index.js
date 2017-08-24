import React, { Component } from 'react'

import { connect } from 'react-redux'
import { actions, selectors } from '../../../shared/store/redux'

// components declaration
import PageFrame from '../page'
import Loader from '../../components/loader'
import BigGrid from '../../layouts/big-grid'

const mapStateToProps = state => ({
  stories: selectors.api.stories(state)
})

const mapDispatchToProps = {
  fetchStories: actions.api.stories
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StoriesPage extends Component {
  componentWillMount() {
    this.props.fetchStories()
  }

  renderStories(stories) {
    const processedStories = stories.map(story => ({
      id: story.ID,
      img: story.Cover,
      title: story.Title,
      subtitle: story.Subtitle,
      link: { pathname: `/collections/${story.ID}` }
    }))

    return <BigGrid elements={processedStories} />
  }

  createMeta() {
    const title = 'Photo Topics with Commentaries'
    const description = 'Cities around the world; cemeteries; churches; and anything else that catches my attention'
    const image = 'https://static.jess.gallery/cb514eed-a199-424a-ae06-9e6ee832c670_1200.jpg'
    const meta = {
      title,
      description,
      meta: {
        name: {
          keywords: 'jess zaikova, blog, photography, cities, churches, cemeteries, travel, culture'
        },
        itemProp: {
          name: title,
          description,
          image
        },
        property: {
          'og:title': title,
          'og:url': 'https://jess.gallery/collections',
          'og:image': image,
          'og:image:type': 'image/jpeg',
          'og:description': description,
          'twitter:card': 'summary_large_image',
          'twitter:site': '@jesszaikova',
          'twitter:creator': '@jesszaikova',
          'twitter:url': 'https://jess.gallery/collections',
          'twitter:title': title,
          'twitter:description': description,
          'twitter:image': image
        }
      },
      auto: {
        ograph: true
      }
    }

    return meta
  }

  render() {
    const { stories } = this.props
    const isLoading = stories.isPending
    const storiesData = stories.data || []
    const meta = this.createMeta()
    return (
      <PageFrame wide meta={meta}>
        {isLoading && <Loader />}
        {!isLoading && this.renderStories(storiesData)}
      </PageFrame>
    )
  }
}
