import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './pages/App'
import PopularVideosPage from './pages/PopularVideosPage'
import RecentVideosPage from './pages/RecentVideosPage'
import FavoriteVideosPage from './pages/FavoriteVideosPage'
import CollectVideosPage from './pages/CollectVideosPage'
import VideoPage from './pages/VideoPage'
import NotesPage from './pages/NotesPage'
import WordsPage from './pages/WordsPage'
import DashboardPage from './pages/DashboardPage'
import Page404 from './pages/errors/Page404'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PopularVideosPage} />
    <Route path='/populars' component={PopularVideosPage} />
    <Route path='/videos/:slugOrId' component={VideoPage} />
    <Route path='/recents' component={RecentVideosPage} />
    <Route path='/favorites(/:id)' component={FavoriteVideosPage} />
    <Route path='/collects(/:id)' component={CollectVideosPage} />
    <Route path='/notes' component={NotesPage} />
    <Route path='/words' component={WordsPage} />
    <Route path='/dashbord' component={DashboardPage} />
    <Route path="*" component={Page404} />
  </Route>
);