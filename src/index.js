import App from './App'
import {configureStore} from './configure-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

const store = configureStore()

injectTapEventPlugin()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root')
)