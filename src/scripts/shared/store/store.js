import { observable, computed, asMap } from 'mobx';

import { get } from '../utils/fetch';

export class Store {
  @observable images = asMap({})
  @observable timer = 0
  // @observer images = {}

  constructor() {
    // this.timer = observable(0)
    // setInterval(() => {
    //   this.timer += 1
    // }, 1000)
  }

  fetchImages({ params }) {
    get('http://cms.jess.gallery/v1/api/images', { params })
      .then((res) => {
        this.images.set(params.type, res)
      })
  }
}

export const store = new Store()
