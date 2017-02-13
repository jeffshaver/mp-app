import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import gql from 'graphql-tag'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './components/Loading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SideBar from './components/SideBar'
import {compose, graphql} from 'react-apollo'
import NamespacesQuery, {NamespacesQueryOptions} from './queries/NamespacesQuery'
import ProjectsQuery, {ProjectsQueryOptions} from './queries/ProjectsQuery'
import React, {Component, PropTypes} from 'react'
import UserQuery, {UserQueryOptions} from './queries/UserQuery'

// get user and prefetch projects / namespaces
const AppQuery = gql`
  query App {
    deployments {
      id
      name
      namespaceId
      status
    }
  }
`

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    deploymentId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    namespaceId: PropTypes.string,
    projectId: PropTypes.string,
    user: ImmutablePropTypes.map.isRequired
  }

  componentDidMount () {
    const {user} = this.props

    if (user.getIn(['data', 'authenticated'])) return
  }

  render () {
    const {
      children,
      deploymentId,
      namespaceId,
      projectId,
      user
    } = this.props
    const content = user.getIn(['data', 'authenticated'])
      ? (
        <div
          style={{
            height: '100%',
            margin: '0 0 0 256px',
            position: 'relative'
          }}
        >
          <SideBar
            deploymentId={deploymentId}
            namespaceId={namespaceId}
            projectId={projectId}
          />
          {children}
        </div>
      )
      : (
        <Loading message={'Fetching User Data'} />
      )

    return (
      <MuiThemeProvider>
        {content}
      </MuiThemeProvider>
    )
  }
}

export default compose(
  graphql(AppQuery, {
    props: ({data: {loading: isFetching, deployments}}) => ({
      isFetching,
      deployments: fromJS({
        data: deployments
      })
    })
  }),
  graphql(UserQuery, UserQueryOptions),
  graphql(NamespacesQuery, NamespacesQueryOptions),
  graphql(ProjectsQuery, ProjectsQueryOptions),
  connect((state, ownProps) => {
    return {
      deploymentId: ownProps.params.deploymentId,
      namespaceId: ownProps.params.namespaceId,
      projectId: ownProps.params.projectId
    }
  })
)(App)