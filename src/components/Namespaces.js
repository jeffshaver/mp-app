import CardWrapper from './CardWrapper'
import goToDeployments from '../utilities/go-to-deployments'
import gql from 'graphql-tag'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import Table from './Table'
import {compose, graphql} from 'react-apollo'
import {fromJS, Map} from 'immutable'
import ProjectQuery, {ProjectQueryOptions} from '../queries/ProjectQuery'
import React, {Component, PropTypes} from 'react'

const NamespacesQuery = gql`
  query Namespaces($projectId: String) {
    namespacesByProject(projectId: $projectId) {
      id
      name
      projectId
      status
    }
  }
`

// TODO: handle error state
export class Namespaces extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    namespaces: ImmutablePropTypes.list.isRequired,
    project: ImmutablePropTypes.map,
    projectId: PropTypes.string
  }

  static defaultProps = {
    isFetching: true,
    project: Map()
  }

  handleRowClick = (data) => {
    const id = data.get('id')
    const projectId = data.get('projectId')

    goToDeployments(id, projectId)
  }

  render () {
    const {isFetching, namespaces, project} = this.props
    const header = (
      <Header
        path={[project.get('name', ''), 'namespaces']}
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
            data={namespaces}
            headers={headers}
            showIdColumn={true}
            onRowClick={this.handleRowClick}
          />
        </CardWrapper>
      </div>
    )
  }
}

export default compose(
  graphql(NamespacesQuery, {
    options: ({params: {projectId}}) => ({
      variables: {
        projectId
      }
    }),
    props: ({data: {loading: isFetching, namespacesByProject = []}}) => ({
      isFetching,
      namespaces: fromJS(namespacesByProject)
    })
  }),
  graphql(ProjectQuery, ProjectQueryOptions)
)(Namespaces)