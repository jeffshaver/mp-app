/* globals describe, expect, it */

import {Map} from 'immutable'
import reducer, {
  FAILURE,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  initialState,
  REQUEST,
  SUCCESS
} from './user'

describe('sync actions', () => {
  it('should create a FAILURE action when the fetch fails', () => {
    const error = new Error('fetch error')
    const expectedAction = {
      payload: {error},
      type: FAILURE
    }

    expect(fetchUserFailure(error)).toEqual(expectedAction)
  })

  it('should create a REQUEST action when the fetch starts', () => {
    const expectedAction = {
      type: REQUEST
    }

    expect(fetchUserRequest()).toEqual(expectedAction)
  })

  it('should create a SUCCESS action when the fetch fails', () => {
    const expectedAction = {
      payload: {data: {}},
      receivedAt: null,
      type: SUCCESS
    }
    const result = fetchUserSuccess({})

    expectedAction.receivedAt = result.receivedAt

    expect(result).toEqual(expectedAction)
  })
})

// API: add tests
// describe('async actions', () => {
// })

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${FAILURE}`, () => {
    const error = new Error('fetch error')

    expect(reducer(initialState, {
      payload: {error},
      type: FAILURE
    })).toEqual(Map({
      data: Map(),
      error,
      isFetching: false,
      lastUpdated: null
    }))
  })

  it(`should handle ${REQUEST}`, () => {
    expect(reducer(initialState, {
      type: REQUEST
    })).toEqual(Map({
      data: Map(),
      error: undefined,
      isFetching: true,
      lastUpdated: null
    }))
  })

  it(`should handle ${SUCCESS}`, () => {
    const data = {authenticated: true, username: 'darth'}
    const result = reducer(initialState, {
      payload: {data},
      type: SUCCESS
    })

    expect(result).toEqual(Map({
      data: Map(data),
      error: undefined,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }))
  })
})