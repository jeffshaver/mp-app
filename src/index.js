import App from './App'
import {configureStore} from './configure-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Namespaces from './components/Namespaces'
import Project from './components/Project'
import Projects from './components/Projects'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, IndexRedirect, Route, Router} from 'react-router'

const store = configureStore()

injectTapEventPlugin()

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        component={App}
        path={'/'}
      >
        <IndexRedirect
          to={'/projects'}
        />
        <Route
          component={Projects}
          path={'/projects'}
        />
        <Route
          component={Project}
          path={'/projects/:projectId'}
        />
        <Route
          component={Namespaces}
          path={'/projects/:projectId/namespaces'}
        />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))