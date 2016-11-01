/* global __SERVER__ */

import { delay, wait } from 'delounce';
import { preload } from 'pic-loader';
import { observable, transaction, toJS } from 'mobx';
import { get } from '../utils/fetch';

export class Store {
  constructor() {
    let initialValue = {
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
    };

    if (!__SERVER__ && window.__INITIAL_DATA__ && window.__INITIAL_DATA__.store) {
      initialValue = window.__INITIAL_DATA__.store;
    }

    this.images = observable(initialValue);
  }

  serialize() {
    return toJS(this.images);
  }

  isLoading(type) {
    return this.images[type].loading;
  }

  getData(type) {
    return this.images[type].data || [];
  }

  fetchImages({ params }) {
    const type = params.type;

    const isLoading = this.images[type].loading;
    const isLoaded = Boolean(this.images[type].data.length);
    if (isLoading || isLoaded) {
      return Promise.resolve();
    } else {
      this.images[type].loading = true;
      const promise = get('http://cms.jess.gallery/v1/api/images', { params });
      return delay({ fn: promise, time: 500 })
        .then((rawRes) => {
          const res = rawRes.map(x => {
            return {
              ...x,
              description: x.description.replace(/"/g, '\"'),
              title: x.title.replace(/"/g, '\"')
            };
          });
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
}
