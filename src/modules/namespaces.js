import {Map} from 'immutable'
// API: remove
import namespacesData from '../data/namespaces'

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
    dispatch(fetchNamespacesSuccess(namespacesData[userId]))

    // API: add back in
    // return fetch(`${apiUri}/authenticate`, {...defaultFetchOptions})
    //   .then(checkFetchStatus)
    //   .then((response) => response.json())
    //   .then((json) => dispatch(fetchNamespacesSuccess(json)))
    //   .catch((error) => dispatch(fetchNamespacesFailure(error)))
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
        data: Map(data),
        error: undefined,
        isFetching: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}