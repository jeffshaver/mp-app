import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {getNamespacesForProject} from '../modules/namespaces'
import {getProject} from '../modules/project'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {List} from 'immutable'
import Loading from './Loading'
import Table from './Table'
import React, {Component, PropTypes} from 'react'

// TODO: handle error state
export class Namespaces extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    namespaces: ImmutablePropTypes.map.isRequired,
    namespacesForProject: ImmutablePropTypes.map.isRequired,
    project: ImmutablePropTypes.map,
    projectId: PropTypes.string.isRequired,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }

  handleRowClick = (id) => {
    browserHistory.push(`/namespaces/${id}`)
  }

  goToProjects = () => {
    browserHistory.push('/projects')
  }

  render () {
    const {namespaces, namespacesForProject, project, projects} = this.props
    const header = (
      <Header>
        <span
          style={{
            cursor: 'pointer'
          }}
          onTouchTap={this.goToProjects}
        >
          Projects
        </span> / {project && project.get('name', '')} / Namespaces
      </Header>
    )

    if (projects.get('isFetching', false)) {
      return (
        <div>
          {header}
          <Loading message={'Fetching Projects'} />
        </div>
      )
    }

    if (namespaces.get('isFetching', false)) {
      return (
        <div>
          {header}
          <Loading message={'Fetching Namespaces'} />
        </div>
      )
    }

    if (!project) return null

    const headers = List(['Name', 'Status'])

    return (
      <div>
        {header}
        <Table
          data={namespacesForProject}
          headers={headers}
          showIdColumn={true}
        />
      </div>
    )
  }
}

export default connect((state, {params: {projectId}}) => ({
  namespaces: state.namespaces,
  namespacesForProject: getNamespacesForProject(state, projectId),
  project: getProject(state, projectId),
  projectId,
  projects: state.projects,
  user: state.user
}))(Namespaces)