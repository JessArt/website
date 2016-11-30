/* global __SERVER__ */

export default class Base {
  constructor(key) {
    if (!__SERVER__ && window.__INITIAL_DATA__ && window.__INITIAL_DATA__[key]) {
      this.initialValue = window.__INITIAL_DATA__.store
    }
  }

  serialize() {
    return toJS(this.data)
  }
}
