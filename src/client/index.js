import React from 'react'
import ReactDOM from 'react-dom'
import Router from '../shared/router/routes'
import { Provider } from 'mobx-react'
import { createStores } from '../shared/store'
import '../shared/styles/common.css'
import '../shared/styles/common.sass'

const stores = createStores()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider {...stores}>
      {Router}
    </Provider>,
    document.getElementById('app')
  )
})
