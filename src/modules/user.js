import {Map} from 'immutable'
// API: remove
import userData from '../data/user'

export const FAILURE = 'mp-app/user/FAILURE'
export const REQUEST = 'mp-app/user/REQUEST'
export const SUCCESS = 'mp-app/user/SUCCESS'

export const fetchUserFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchUserRequest = (json) => ({
  type: REQUEST
})

export const fetchUserSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchUser = () =>
  (dispatch) => {
    dispatch(fetchUserRequest())

    // API: remove
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        dispatch(fetchUserSuccess(userData))
        resolve(userData)
      }, 1000)
    })

    return promise

    // API: add back in
    // return fetch(`${apiUri}/authenticate`, {...defaultFetchOptions})
    //   .then(checkFetchStatus)
    //   .then((response) => response.json())
    //   .then((json) => dispatch(fetchUserSuccess(json)))
    //   .catch((error) => dispatch(fetchUserFailure(error)))
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