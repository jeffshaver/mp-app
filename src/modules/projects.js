import fetch from 'isomorphic-fetch'
import {checkFetchStatus, findById, handleFailure, handleSuccess} from './utilities'
import {fromJS, List, Map} from 'immutable'

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

const handleFetchProjectsFailure = (handleFailure(fetchProjectsFailure))
const handleFetchProjectsSuccess = (handleSuccess(fetchProjectsSuccess, 'projects'))

export const fetchProjects = (userId) =>
  (dispatch) => {
    dispatch(fetchProjectsRequest(userId))

    return fetch(`http://localhost:4000/graphql?query={projects(userId:"${userId}"){id,name,status}}`)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => handleFetchProjectsSuccess(dispatch, json))
      .catch((error) => handleFetchProjectsFailure(dispatch, error))
  }

export const getProject = (state, id) => {
  return findById(state.projects.get('data'), id)
}

export const initialState = Map({
  data: List(),
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
        data: fromJS(data),
        error: undefined,
        isFetching: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}