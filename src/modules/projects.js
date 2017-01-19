import {Map} from 'immutable'
// API: remove
import projectsData from '../data/projects'

export const FAILURE = 'mp-app/projects/FAILURE'
export const REQUEST = 'mp-app/projects/REQUEST'
export const SUCCESS = 'mp-app/projects/SUCCESS'

export const fetchProjectsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchProjectsRequest = (json) => ({
  type: REQUEST
})

export const fetchProjectsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchProjects = (userId) =>
  (dispatch) => {
    dispatch(fetchProjectsRequest(userId))

    // API: remove
    dispatch(fetchProjectsSuccess(projectsData[userId]))

    // API: add back in
    // return fetch(`${apiUri}/authenticate`, {...defaultFetchOptions})
    //   .then(checkFetchStatus)
    //   .then((response) => response.json())
    //   .then((json) => dispatch(fetchProjectsSuccess(json)))
    //   .catch((error) => dispatch(fetchProjectsFailure(error)))
  }

const initialState = Map({
  data: Map(),
  error: undefined,
  isFetching: false,
  lastUpdated: null
})

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error} = payload

  switch (type) {
    case FAILURE:
      return state.merge({
        error,
        isFetching: false
      })
    case REQUEST:
      return state.merge({
        error: undefined,
        isFetching: true
      })
    case SUCCESS:
      return state.merge({
        data: Map(data),
        error: undefined,
        isFetching: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}