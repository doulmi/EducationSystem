import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './pages/App'
import HomePage from './pages/HomePage'
import Page404 from './pages/errors/Page404'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={Page404} />
  </Route>
);