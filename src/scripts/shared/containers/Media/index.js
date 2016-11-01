import React, { Component, PropTypes } from 'react';

// router declaration
import { browserHistory } from 'react-router';

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

  constructor(props) {
    super(props);

    this.handleKeys = this._handleKeys.bind(this);
  }

  componentDidMount() {
    const { location: { query: { type } }, store } = this.props;
    store.fetchImages({ params: { type } });

    document.addEventListener('keydown', this.handleKeys);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys);
  }

  _handleKeys(e) {
    const { params: { id }, location: { query: { type } }, store } = this.props;
    const items = store.getData(type);
    const index = items.findIndex((x) => x.id === id);
    const item = items[index];
    const previous = items[index - 1];
    const next = items[index + 1];
    if (e.keyCode === 37 && previous) {
      browserHistory.push({ pathname: `/media/${previous.id}`, query: { type: previous.type } });
    } else if (e.keyCode === 39 && next) {
      browserHistory.push({ pathname: `/media/${next.id}`, query: { type: next.type } });
    }
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
