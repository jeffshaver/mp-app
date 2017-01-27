import fetch from 'isomorphic-fetch'
import {checkFetchStatus, filterByKey, handleFailure, handleSuccess} from './utilities'
import {fromJS, List, Map} from 'immutable'

export const FAILURE = 'mp-app/namespaces/FAILURE'
export const REQUEST = 'mp-app/namespaces/REQUEST'
export const SUCCESS = 'mp-app/namespaces/SUCCESS'

export const fetchNamespacesFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchNamespacesRequest = (json) => ({
  type: REQUEST
})

export const fetchNamespacesSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

const handleFetchNamespacesFailure = handleFailure(fetchNamespacesFailure)
const handleFetchNamespacesSuccess = handleSuccess(fetchNamespacesSuccess, 'namespaces')

export const fetchNamespaces = (userId) =>
  (dispatch) => {
    dispatch(fetchNamespacesRequest(userId))

    return fetch(`http://localhost:4000/graphql?query={namespaces(userId:"${userId}"){id,name,projectId,status}}`)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => handleFetchNamespacesSuccess(dispatch, json))
      .catch((error) => handleFetchNamespacesFailure(dispatch, error))
  }

// Selectors
export const getNamespacesForProject = (state, projectId) => {
  return filterByKey(state.namespaces.get('data'), projectId, 'projectId')
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