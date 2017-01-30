import CardWrapper from './CardWrapper'
import {fromJS} from 'immutable'
import goToNamespaces from '../utilities/go-to-namespaces'
import {graphql} from 'react-apollo'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import Table from './Table'
import ProjectsQuery, {ProjectsQueryOptions} from '../queries/ProjectsQuery'
import React, {Component} from 'react'

// TODO: handle error state
export class Projects extends Component {
  static propTypes = {
    projects: ImmutablePropTypes.map.isRequired
  }

  static defaultProps = {
    projects: fromJS({
      data: []
    })
  }

  handleRowClick = (data) => {
    const id = data.get('id')

    goToNamespaces(id)
  }

  render () {
    const {projects} = this.props
    const header = <Header path={['projects']} />

    if (projects.get('isFetching')) {
      return (
        <div>
          {header}
          <Loading message={'Fetching Projects'} />
        </div>
      )
    }
    const headers = fromJS([
      'Name',
      'Status'
    ])

    return (
      <div>
        {header}
        <CardWrapper>
          <Table
            data={projects.get('data')}
            headers={headers}
            showIdColumn={true}
            onRowClick={this.handleRowClick}
          />
        </CardWrapper>
      </div>
    )
  }
}

export default graphql(ProjectsQuery, ProjectsQueryOptions)(Projects)