import test from 'ava'

import { ImagesStore } from '../images'
import { toJS } from 'mobx'

test.before(() => {
  global.__SERVER__ = true
})

test('it should serialize correcty', t => {
  const store = new ImagesStore()

  t.deepEqual(store.serialize(), {
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
  })
})

test('it should return loading status correctly', t => {
  const store = new ImagesStore()

  store.data.art.loading = true

  t.true(store.isLoading('art'))
  t.false(store.isLoading('photo'))
})

test('it should return correct data', t => {
  const store = new ImagesStore()

  store.data.art.data = [1, 2, 3]

  t.deepEqual(toJS(store.getData('art')), [1, 2, 3])
})
