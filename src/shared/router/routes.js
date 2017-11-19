/* global __SERVER__ */

import React from 'react'
import { Router, IndexRoute, Route, browserHistory, Redirect, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'

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
import Stories from '../containers/Stories'
import Story from '../containers/Story'

export default (
  <Router history={browserHistory} render={!__SERVER__ && applyRouterMiddleware(useScroll())}>
    <Route path={'/'} component={App}>
      <IndexRoute component={Home} />
      <Route path={'art'} component={Art} />
      <Route path={'photo'} component={Photos} />
      <Redirect from={'articles'} to={'travel'} />
      <Redirect from={'articles/:id'} to={'travel/:id'} />
      <Route path={'travel'} component={Articles} />
      <Route path={'travel/:id'} component={Article} />
      <Route path={'media/:id'} component={Media} />
      <Route path={'collections'} component={Stories} />
      <Route path={'collections/:id'} component={Story} />
      <Route path={'music'} component={Music} />
      <Route path={'about'} component={About} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
)
