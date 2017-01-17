import App from './App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'

injectTapEventPlugin()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)