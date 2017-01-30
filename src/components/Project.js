import {connect} from 'react-redux'
import {getProject} from '../modules/projects'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import Namespaces from './Namespaces'
import React, {Component, PropTypes} from 'react'

// TODO: Handle error state
export class Project extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    project: PropTypes.object,
    projectId: PropTypes.string.isRequired,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }

  render () {
    const {project, projectId, projects} = this.props

    if (projects.get('isFetching')) {
      return (
        <div>
          <Header path={['projects']} />
          <Loading message={'Loading Projects'} />
        </div>
      )
    }

    if (!project) return null

    return (
      <div>
        <Header>
          <span
            style={{
              cursor: 'pointer'
            }}
            onTouchTap={this.goToProjects}
          >
            Projects
          </span> / {project.get('name')}
        </Header>
        <Namespaces projectId={projectId} />
      </div>
    )
  }
}

export default connect((state, {params: {projectId}}) => ({
  project: getProject(state, projectId),
  projectId,
  projects: state.projects,
  user: state.user
}))(Project)