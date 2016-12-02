import React from 'react'
import { Router, IndexRoute, Route, browserHistory, Redirect } from 'react-router'

import App from '../containers/App'
import Home from '../containers/Home'
import Art from '../containers/Art'
import Articles from '../containers/Articles'
import Article from '../containers/Article'
import Photos from '../containers/Photos'
import Media from '../containers/Media'
import Music from '../containers/Music'
import NoMatch from '../containers/404'
import About from '../containers/About'

export default (
  <Router history={browserHistory}>
    <Route path={'/'} component={App}>
      <IndexRoute component={Home} />
      <Route path={'art'} component={Art} />
      <Route path={'photo'} component={Photos} />
      <Redirect from={'articles'} to={'travel'} />
      <Redirect from={'articles/:id'} to={'travel/:id'} />
      <Route path={'travel'} component={Articles} />
      <Route path={'travel/:id'} component={Article} />
      <Route path={'media/:id'} component={Media} />
      <Route path={'music'} component={Music} />
      <Route path={'about'} component={About} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
)
