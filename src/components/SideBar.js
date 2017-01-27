import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer'
import ImmutablePropTypes from 'react-immutable-proptypes'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from 'material-ui/SelectField'
import Subheader from 'material-ui/Subheader'
import React, {Component, PropTypes} from 'react'

class SideBar extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
    namespaces: ImmutablePropTypes.map.isRequired
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
      },
      namespaces
    } = this.props

    return (
      <Drawer
        containerStyle={{borderRight: `1px solid ${borderColor}`}}
        docked={true}
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
              padding: '2rem 0 .5rem .5rem'
            }}
          >MP</h1>
        </MenuItem>
        <Subheader>Namespaces</Subheader>
        <SelectField
          fullWidth={true}
          value={1}
        >
          {
            namespaces.get('data').map((namespace, id) => {
              return (
                <MenuItem
                  key={id}
                  primaryText={namespace.get('name')}
                  value={id}
                />
              )
            })
          }
        </SelectField>
        {
          /*
           * Loop through routes to generate menu items
          */
        }
      </Drawer>
    )
  }
}

export default connect((state) => ({
  namespaces: state.namespaces
}))(muiThemeable()(SideBar))