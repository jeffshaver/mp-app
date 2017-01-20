import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React, {Component, PropTypes} from 'react'

class SideBar extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  handleLogoClick = () => {
    browserHistory.push('/')
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
            padding: 0
          }}
          onTouchTap={this.handleLogoClick}
        >
          <h1
            style={{
              background: primary1Color,
              color: alternateTextColor,
              lineHeight: 'initial',
              margin: 0,
              padding: '2rem 0 .5rem 0'
            }}
          >MP</h1>
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