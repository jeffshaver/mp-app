import {connect} from 'react-redux'
import {fetchProjects} from '../modules/projects'
import getScrollbarWidth from 'scrollbar-width'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React, {Component, PropTypes} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export class Projects extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    projects: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }
  componentDidMount () {
    const {dispatch, user} = this.props

    dispatch(fetchProjects(user.getIn(['data', 'id'])))
  }

  render () {
    const {projects} = this.props
    const numberOfProjects = projects.count()
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
        <h1>Projects</h1>
        <Table
          fixedFooter={false}
          headerStyle={headerStyle}
          height={`${tableHeight}px`}
          selectable={false}
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
              projects.get('data').entrySeq().toArray().map(([id, data]) => (
                <TableRow
                  key={id}
                  striped={true}
                >
                  <TableRowColumn>{id}</TableRowColumn>
                  <TableRowColumn>{data.name}</TableRowColumn>
                  <TableRowColumn>{data.status}</TableRowColumn>
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