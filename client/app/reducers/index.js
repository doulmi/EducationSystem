import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth'
import videos from './videos'

const rootReducer = combineReducers({
  routing,
  auth,
  videos
});

export default rootReducer;
