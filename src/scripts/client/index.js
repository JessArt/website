import React from 'react'
import ReactDOM from 'react-dom'
import Router from '../shared/router/routes'
import { Provider } from 'mobx-react'
import { createStores } from '../shared/store'
const stores = createStores();

import '../shared/styles/common.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider {...stores}>
      {Router}
    </Provider>,
    document.getElementById('app')
  )
})
