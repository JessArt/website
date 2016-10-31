import { delay, wait } from 'delounce';
import { preload } from 'pic-loader';
import { observable, transaction } from 'mobx';

import { get } from '../utils/fetch';

export class Store {
  @observable images = {
    art: {
      data: [],
      loading: false,
      error: null
    },
    photo: {
      data: [],
      loading: false,
      error: null
    }
  }

  isLoading(type) {
    return this.images[type].loading;
  }

  getData(type) {
    return this.images[type].data || [];
  }

  fetchImages({ params }) {
    const type = params.type;
    this.images[type].loading = true;
    const promise = get('http://cms.jess.gallery/v1/api/images', { params });
    return delay({ fn: promise, time: 500 })
      .then((res) => {
        const imgs = res.map(x => x.small_url);
        // preload only first 15 images
        const firstImages = res.slice(0, 15);
        const fn = preload(firstImages);
        return wait({ fn, time: 1000 })
          .then(() => {
            transaction(() => {
              this.images[type].data = res;
              this.images[type].loading = false;
            });
          })
      })
  }
}

export const store = new Store()
