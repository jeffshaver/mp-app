import fetch from 'isomorphic-fetch'
import {Map} from 'immutable'
import {checkFetchStatus, handleFailure, handleSuccess} from './utilities'

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

const handleFetchUserFailure = handleFailure(fetchUserFailure)
const handleFetchUserSuccess = handleSuccess(fetchUserSuccess, 'user')

export const fetchUser = () =>
  (dispatch) => {
    dispatch(fetchUserRequest())

    return fetch('http://localhost:4000/graphql/?query={user{authenticated,id,username}}')
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => handleFetchUserSuccess(dispatch, json))
      .catch((error) => handleFetchUserFailure(dispatch, error))
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