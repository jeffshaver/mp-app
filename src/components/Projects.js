import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {List} from 'immutable'
import Loading from './Loading'
import Table from './Table'
import React, {Component, PropTypes} from 'react'

// TODO: handle error state
export class Projects extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }

  handleRowClick = (id) => {
    browserHistory.push(`/projects/${id}/namespaces`)
  }

  render () {
    const {projects} = this.props
    const header = <Header>Projects</Header>

    if (projects.get('isFetching')) {
      return (
        <div>
          {header}
          <Loading message={'Fetching Projects'} />
        </div>
      )
    }
    const headers = List([
      'Name',
      'Status'
    ])

    return (
      <div>
        {header}
        <Table
          data={projects.get('data')}
          headers={headers}
          showIdColumn={true}
          onRowClick={this.handleRowClick}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  projects: state.projects,
  user: state.user
}))(Projects)