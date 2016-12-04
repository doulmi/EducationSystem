import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    case UPDATE_CURRENT_USER:
      return {
        isAuthenticated: state.isAuthenticated,
        user: {
          _id: state.user._id,
        }
      }

    default: return state;
  }
}

export default auth
