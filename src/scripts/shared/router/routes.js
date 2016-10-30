import React from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import App from '../containers/App'
import Home from '../containers/Home'
import Art from '../containers/Art'
import Photos from '../containers/Photos'

export default (
  <Router history={browserHistory}>
    <Route path={'/'} component={App}>
      <IndexRoute component={Home} />
      <Route path={'art'} component={Art} />
      <Route path={'photo'} component={Photos} />
    </Route>
  </Router>
)
