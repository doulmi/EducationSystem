import axios from 'axios'
import * as types from './types'
import { videoPageNumber, serverUrl } from '../constants'

function loadVideosAction(videos, pagination) {
  return {
    type: types.LOAD_VIDEOS,
    videos: videos,
    pagination: pagination,
  }
}

function loadNextPageVidesAction(videos, pagination) {
  return {
    type: types.LOAD_NEXT_PAGE_VIDEOS,
    videos: videos,
    pagination: pagination,
  }
}

//api : api/videos/30/1?query
export function loadVideos(page = 1, limit = videoPageNumber, query = '') {
  return dispatch => {
    return axios.get(`${serverUrl}/videos/all/${limit}/${page}/id` + query).then(
      res => {
        let videos = res.data && res.data.data || [];
        let pagination = res.data && res.data.meta && res.data.meta.pagination || {}
        if (page == 1) {
          dispatch(loadVideosAction(videos, pagination));
        } else {
          dispatch(loadNextPageVidesAction(videos, pagination));
        }
      }
    )
  }
}

export function loadVideoAction(video) {
  return {
    type: types.LOAD_VIDEO,
    video: video
  }  
}

export function loadVideo(idOrSlug) {
  return dispatch => {
    return axios.get(`${serverUrl}/videos/${idOrSlug}`).then(
      res => {
        let video = res.data.video;
        dispatch(loadVideoAction(video));
      }
    )
  }
}