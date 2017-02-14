import {ApolloProvider} from 'react-apollo'
import App from './App'
import {configureStore} from './configure-store'
import CreateNamespace from './components/CreateNamespace'
import Deployments from './components/Deployments'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Namespace from './components/Namespace'
import Namespaces from './components/Namespaces'
import Project from './components/Project'
import Projects from './components/Projects'
// import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import ApolloClient, {createNetworkInterface, toIdValue} from 'apollo-client'
import {browserHistory, IndexRedirect, Route, Router} from 'react-router'

const host = window.location.host
const apiAddress = process.env.API_ADDRESS
const apiUri = apiAddress || `//${host}/api`
const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return result.__typename + result.id
  }

  return null
}
const client = new ApolloClient({
  dataIdFromObject,
  customResolvers: {
    Query: {
      namespace: (_, args) => {
        return toIdValue(dataIdFromObject({__typename: 'Namespace', id: args['namespaceId']}))
      },
      project: (_, args) => {
        return toIdValue(dataIdFromObject({__typename: 'Project', id: args['projectId']}))
      }
    }
  },
  networkInterface: createNetworkInterface({
    opts: {
      credentials: 'include'
    },
    uri: `${apiUri}`
  })
})
const store = configureStore({}, {
  apollo: client.reducer()
}, [
  thunk,
  client.middleware()
])

injectTapEventPlugin()

ReactDOM.render((
  <ApolloProvider
    client={client}
    store={store}
  >
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
        <Route
          component={Namespace}
          path={'/projects/:projectId/namespaces/:namespaceId'}
        />
        <Route
          component={Deployments}
          path={'/projects/:projectId/namespaces/:namespaceId/deployments'}
        />
        <Route
          component={CreateNamespace}
          path={'/namespaces/create'}
        />
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'))