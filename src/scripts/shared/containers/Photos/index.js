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
    return stores.store.fetchImages({ params: { type: 'photo' }});
  }

  componentDidMount() {
    this.props.store.fetchImages({ params: { type: 'photo' }})
  }

  render() {
    const isLoading = this.props.store.isLoading('photo')
    const photos = this.props.store.getData('photo')
    const photosElements = (photos || []).map(x => {
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
      <PageFrame>
        {content}
      </PageFrame>
    );
  }
}
