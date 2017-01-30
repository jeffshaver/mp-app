import {browserHistory} from 'react-router'
import CardWrapper from './CardWrapper'
import gql from 'graphql-tag'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import Table from './Table'
import {compose, graphql} from 'react-apollo'
import {fromJS, List, Map} from 'immutable'
import NamespaceQuery, {NamespaceQueryOptions} from '../queries/NamespaceQuery'
import ProjectQuery, {ProjectQueryOptions} from '../queries/ProjectQuery'
import React, {Component, PropTypes} from 'react'

const DeploymentsQuery = gql`
  query Deployments($namespaceId: String) {
    deploymentsByNamespace(namespaceId: $namespaceId) {
      id
      name
      namespaceId
      status
    }
  }
`

// TODO: handle error state
export class Deployments extends Component {
  static propTypes = {
    deployments: ImmutablePropTypes.list.isRequired,
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    namespace: ImmutablePropTypes.map,
    project: ImmutablePropTypes.map,
    projectId: PropTypes.string
  }

  static defaultProps = {
    isFetching: true,
    deployments: List(),
    namespace: Map(),
    project: Map()
  }

  handleRowClick = (data) => {
    const id = data.get('id')
    const projectId = data.get('projectId')

    browserHistory.push(`/projects/${projectId}/namespaces/${id}`)
  }

  render () {
    const {isFetching, deployments, namespace, project} = this.props
    const projectName = project.get('name', '')
    const namespaceName = namespace.get('name', '')
    const header = (
      <Header
        path={[projectName, namespaceName, 'deployments']}
      />
    )

    if (isFetching) {
      return (
        <div>
          {header}
          <Loading />
        </div>
      )
    }

    const headers = fromJS(['Name', 'Status'])

    return (
      <div>
        {header}
        <CardWrapper>
          <Table
            data={deployments}
            headers={headers}
            showIdColumn={true}
          />
        </CardWrapper>
      </div>
    )
  }
}

export default compose(
  graphql(DeploymentsQuery, {
    options: ({params: {namespaceId}}) => ({
      variables: {
        namespaceId
      }
    }),
    props: ({data: {loading: isFetching, deploymentsByNamespace: deployments}}) => ({
      isFetching,
      deployments: fromJS(deployments)
    })
  }),
  graphql(NamespaceQuery, NamespaceQueryOptions),
  graphql(ProjectQuery, ProjectQueryOptions)
)(Deployments)