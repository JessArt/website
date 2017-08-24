/* global __DEV__ */

import { createStore, applyMiddleware } from 'redux'
import { createMiddleware, createEntities } from 'redux-tiles'
import tiles from './tiles'
import * as api from '../../utils/fetch'
import logger from 'redux-logger'

const { actions, reducer, selectors } = createEntities(tiles)
export default function createStoreInstance({ initialState = {} } = {}) {
  const { middleware, waitTiles } = createMiddleware({ actions, selectors, api })
  const middlewares = [middleware].concat(__DEV__ ? logger : [])
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return { store, waitTiles }
}

export { actions, selectors }
