import React, { Component, PropTypes } from 'react';

// mobx declaration
import { observer } from 'mobx-react'

// components declaration
import PageFrame from '../page'
import Grid from '../../components/grid'
import Media from '../../components/media'


@observer(['store'])
export default class ArtPage extends Component {
  componentDidMount() {
    this.props.store.fetchImages({ params: { type: 'photo' }})
  }

  render() {
    const photos = this.props.store.images.get('photo')
    const photosElements = (photos || []).map(x => {
      return (
        <Media key={x.id} item={x} />
      )
    })
    return (
      <PageFrame>
        <Grid>
          {photosElements}
        </Grid>
      </PageFrame>
    );
  }
}
