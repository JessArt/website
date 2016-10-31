import React, { Component, PropTypes } from 'react';

// mobx declaration
import { observer } from 'mobx-react';

// components declaration
import PageFrame from '../page';
import MediaBanner from '../../components/media-banner';
import Loader from '../../components/loader';

@observer(['store'])
export default class MediaPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static willRender(stores, props) {
    const { location: { query: { type = 'photo' } = {} } = {} } = props;
    return stores.store.fetchImages({ params: { type }});
  }

  componentDidMount() {
    const { location: { query: { type } }, store } = this.props;
    store.fetchImages({ params: { type } });
  }

  getItem() {
    const { params: { id }, location: { query: { type } }, store } = this.props;
    const items = store.getData(type);
    const index = items.findIndex((x) => x.id === id);
    const item = items[index];

    return item;
  }

  createMeta() {
    const item = this.getItem();

    if (item) {
      const meta = {
        title: item.title,
        keywords: (item.description || '').split(' ').join(', '),
        description: item.description,
        'og:title': item.title,
        'og:url': `http://jess.gallery/media/${item.id}?type=${item.type}`,
        'og:image': item.small_url,
        'og:image:type': 'image/jpeg',
        'og:description': item.description
      };

      if (item.originalWidth && item.originalHeight) {
        meta['og:image:width'] = 500;
        meta['og:image:height'] = 500 / (item.originalWidth / item.originalHeight);
      }

      return meta;
    }
  }

  renderItem() {
    const { params: { id }, location: { query: { type } }, store } = this.props;
    const items = store.getData(type);
    const index = items.findIndex((x) => x.id === id);
    const item = items[index];
    const previous = items[index - 1];
    const next = items[index + 1];

    return item ? (
      <MediaBanner item={item} previous={previous} next={next} />
    ) : this.renderLoader();
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    const { location: { query: { type } }, store } = this.props;

    const isLoading = store.isLoading(type);
    const content = isLoading ? this.renderLoader() : this.renderItem();
    const meta = this.createMeta();
    return (
      <PageFrame small wide meta={meta}>
        {content}
      </PageFrame>
    );
  }
}
