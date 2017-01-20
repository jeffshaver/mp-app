import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {fetchProjects} from '../modules/projects'
import getScrollbarWidth from 'scrollbar-width'
import {header} from '../styles/common'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import React, {Component, PropTypes} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

// TODO: handle error state
export class Projects extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }
  componentDidMount () {
    const {dispatch, projects, user} = this.props

    if (!projects.get('data').isEmpty()) return

    dispatch(fetchProjects(user.getIn(['data', 'id'])))
  }

  handleRowClick = (id) => {
    browserHistory.push(`/projects/${id}`)
  }

  render () {
    const {projects} = this.props
    const projectsData = projects.get('data')
    const numberOfProjects = projectsData.count()

    if (projects.get('isFetching')) {
      return (
        <Loading message={'Fetching Projects'} />
      )
    }

    const cellHeight = 48
    const tableHeight = 300
    const willHaveScrollbar = numberOfProjects >= Math.round(tableHeight / cellHeight)
    const scrollbarWidth = getScrollbarWidth()
    const headerStyle = {
      width: willHaveScrollbar
        ? `calc(100% - ${scrollbarWidth}px)`
        : '100%'
    }

    return (
      <div>
        <h1 style={header}>Projects</h1>
        <Table
          fixedFooter={false}
          headerStyle={headerStyle}
          height={`${tableHeight}px`}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {
              projectsData.entrySeq().toArray().map(([id, data]) => (
                <TableRow
                  key={id}
                  striped={true}
                  style={{
                    cursor: 'pointer'
                  }}
                  onTouchTap={() => this.handleRowClick(id, data)}
                >
                  <TableRowColumn>{id}</TableRowColumn>
                  <TableRowColumn>{data.get('name')}</TableRowColumn>
                  <TableRowColumn>{data.get('status')}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default connect((state) => ({
  projects: state.projects,
  user: state.user
}))(Projects)