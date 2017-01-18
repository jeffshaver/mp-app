import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React, {Component, PropTypes} from 'react'

class SideBar extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render () {
    const {
      muiTheme: {
        palette: {
          alternateTextColor,
          borderColor,
          primary1Color
        }
      }
    } = this.props

    return (
      <Drawer
        containerStyle={{borderRight: `1px solid ${borderColor}`}}
        docked={true}
        width={110}
        zDepth={0}
      >
        <MenuItem
          innerDivStyle={{
            background: primary1Color,
            color: alternateTextColor,
            padding: '8px 16px',
            fontSize: '1.25rem',
            fontWeight: 600
          }}
        >
          MP
        </MenuItem>
        {
          /*
           * Loop through routes to generate menu items
          */
        }
      </Drawer>
    )
  }
}

export default muiThemeable()(SideBar)