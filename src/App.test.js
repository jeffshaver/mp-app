/* globals it */
import {App} from './App'
import React from 'react'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const dispatch = () => {
    return Promise.resolve({})
  }

  ReactDOM.render(<App dispatch={dispatch} />, div)
})