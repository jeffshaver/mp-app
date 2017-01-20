import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {fetchProjects} from '../modules/projects'
import {getProject} from '../modules/project'
import {header} from '../styles/common'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import React, {Component, PropTypes} from 'react'

// TODO: Handle error state
export class Project extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    project: PropTypes.object,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }

  componentDidMount () {
    const {dispatch, projects, user} = this.props

    if (!projects.get('data').isEmpty()) return

    dispatch(fetchProjects(user.getIn(['data', 'id'])))
  }

  goToProjects = () => {
    browserHistory.push('/projects')
  }

  render () {
    const {project, projects} = this.props

    if (projects.get('isFetching')) {
      return (
        <Loading message={'Loading Projects'} />
      )
    }

    if (!project) return null

    return (
      <h1 style={header}>
        <span
          style={{
            cursor: 'pointer'
          }}
          onTouchTap={this.goToProjects}
        >
          Projects
        </span> / {project.get('name')}</h1>
    )
  }
}

export default connect((state, {params: {id}}) => ({
  project: getProject(state, id),
  projects: state.projects,
  user: state.user
}))(Project)