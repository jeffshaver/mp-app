/* globals describe, expect, it */

import {fromJS, Map} from 'immutable'
import reducer, {
  FAILURE,
  fetchProjectsFailure,
  fetchProjectsRequest,
  fetchProjectsSuccess,
  initialState,
  REQUEST,
  SUCCESS
} from './projects'

describe('sync actions', () => {
  it('should create a FAILURE action when the fetch fails', () => {
    const error = new Error('fetch error')
    const expectedAction = {
      payload: {error},
      type: FAILURE
    }

    expect(fetchProjectsFailure(error)).toEqual(expectedAction)
  })

  it('should create a REQUEST action when the fetch starts', () => {
    const expectedAction = {
      type: REQUEST
    }

    expect(fetchProjectsRequest()).toEqual(expectedAction)
  })

  it('should create a SUCCESS action when the fetch fails', () => {
    const expectedAction = {
      payload: {data: {}},
      receivedAt: null,
      type: SUCCESS
    }
    const result = fetchProjectsSuccess({})

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
    const data = {
      0: {
        status: 'approved',
        name: 'project 1'
      }
    }
    const result = reducer(initialState, {
      payload: {data},
      type: SUCCESS
    })

    expect(result).toEqual(fromJS({
      data,
      error: undefined,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }))
  })
})