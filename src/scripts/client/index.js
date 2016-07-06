import ReactDOM from 'react-dom'
import Router from '../shared/router/routes'

import '../shared/styles/common.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(Router, document.getElementById('app'))
})
