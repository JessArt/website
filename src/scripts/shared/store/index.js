import { Store } from './store'

export function createStores() {
  const store = new Store();
  return {
    store
  };
}
