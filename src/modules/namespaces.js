// API: remove
import namespacesData from '../data/namespaces'
import {fromJS, Map} from 'immutable'

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

export const fetchNamespaces = (userId) =>
  (dispatch) => {
    dispatch(fetchNamespacesRequest(userId))

    // API: remove
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        dispatch(fetchNamespacesSuccess(namespacesData[userId]))
        resolve()
      }, 1000)
    })

    return promise

    // API: add back in
    // return fetch(`${apiUri}/authenticate`, {...defaultFetchOptions})
    //   .then(checkFetchStatus)
    //   .then((response) => response.json())
    //   .then((json) => dispatch(fetchNamespacesSuccess(json)))
    //   .catch((error) => dispatch(fetchNamespacesFailure(error)))
  }

// Selectors
export const getNamespacesForProject = (state, projectId) => {
  return state.namespaces.get('data').filter((namespace, id) => {
    return namespace.get('projectId') === projectId
  })
}

export const initialState = Map({
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
        data: fromJS(data),
        error: undefined,
        isFetching: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}