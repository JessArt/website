/* global __SERVER__ */

import { toJS } from 'mobx'

export default class Base {
  constructor(key) {
    if (!__SERVER__ && window.__INITIAL_DATA__ && window.__INITIAL_DATA__[key]) {
      this.initialValue = window.__INITIAL_DATA__[key]
    }
  }

  serialize() {
    return toJS(this.data)
  }
}
