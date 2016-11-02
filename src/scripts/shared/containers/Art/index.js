import React, { Component, PropTypes } from 'react';

// mobx declaration
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import Loader from '../../components/loader'
import Grid from '../../components/grid'
import Media from '../../components/media'


@observer(['store'])
export default class ArtPage extends Component {
  static willRender(stores, props) {
    return stores.store.fetchImages({ params: { type: 'art' }});
  }

  componentDidMount() {
    this.props.store.fetchImages({ params: { type: 'art' }})
  }

  render() {
    const { store } = this.props
    const isLoading = store.isLoading('art')
    const photos = store.getData('art')
    const photosElements = photos.map(x => {
      return (
        <Media key={x.id} item={x} />
      )
    })

    const content = isLoading ? (
      <div>
        <Loader />
      </div>
    ) : (
      <Grid>
        {photosElements}
      </Grid>
    )
    return (
      <PageFrame small>
        {content}
      </PageFrame>
    );
  }
}
