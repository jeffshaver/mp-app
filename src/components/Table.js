import getScrollbarWidth from 'scrollbar-width'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {
  Table as MaterialTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import React, {Component, PropTypes} from 'react'

class Table extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list.isRequired,
    headers: ImmutablePropTypes.list.isRequired,
    showIdColumn: PropTypes.bool,
    onRowClick: PropTypes.func
  }

  static defaultProps = {
    showIdColumn: false,
    onRowClick: undefined
  }

  render () {
    const {data, headers, showIdColumn, onRowClick} = this.props
    const numberOfRows = data.count()
    const cellHeight = 48
    const tableHeight = 300
    const willHaveScrollbar = numberOfRows >= Math.round(tableHeight / cellHeight)
    const scrollbarWidth = getScrollbarWidth()
    const headerStyle = {
      width: willHaveScrollbar
        ? `calc(100% - ${scrollbarWidth}px)`
        : '100%'
    }

    return (
      <MaterialTable
        fixedFooter={false}
        headerStyle={headerStyle}
        height={willHaveScrollbar ? `${tableHeight}px` : 'auto'}
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            {
              showIdColumn
                ? <TableHeaderColumn key={'id'}>ID</TableHeaderColumn>
                : null
            }
            {
              headers.map((header) => (
                <TableHeaderColumn key={header}>{header}</TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={true}
        >
          {
            data.map((data) => (
              <TableRow
                key={data.get('id')}
                striped={true}
                style={{
                  cursor: onRowClick ? 'pointer' : 'default'
                }}
                onTouchTap={() => onRowClick && onRowClick(data)}
              >
                {
                  showIdColumn
                    ? <TableRowColumn>{data.get('id')}</TableRowColumn>
                    : null
                }
                {
                  headers.map((header) => header.toLowerCase()).map((header) => (
                    <TableRowColumn
                      key={`${data.get('id')}_${data.get(header)}`}
                    >
                      {data.get(header)}
                    </TableRowColumn>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </MaterialTable>
    )
  }
}

export default Table