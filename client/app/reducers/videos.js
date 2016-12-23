import * as types from '../actions/types'

const initialState = {
  videos: [],
  video: {},
  pagination: {}
}

const videos = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VIDEOS:
      return {
        videos: action.videos,
        video: state.video,
        pagination: action.pagination,
      }
    case types.LOAD_NEXT_PAGE_VIDEOS:
      return {
        videos: [...state.videos, ...action.videos],
        video: state.video,
        pagination: action.pagination
      }
    case types.LOAD_VIDEO:
      return {
        videos: state.videos,
        video: action.video,
        pagination: state.pagination
      }

    default: return state;
  }
}

export default videos
