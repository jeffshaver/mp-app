import Add from 'material-ui/svg-icons/content/add'
import {browserHistory} from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
// import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
// import Popover from 'material-ui/Popover'
import React, {Component, PropTypes} from 'react'

const theme = getMuiTheme()

const style = {
  add: {
    color: 'inherit'
  },
  bar: {
    background: theme.palette.primary1Color,
    color: theme.palette.alternateTextColor
  },
  button: {
    padding: '0'
  },
  buttonIcon: {
    color: theme.palette.alternateTextColor
  },
  clear: {
    clear: 'both',
    width: '100%'
  },
  header: {
    display: 'inline-block',
    fontSize: '1.5rem',
    margin: 0,
    position: 'relative'
  },
  headerLeft: {
    padding: '2.4rem 0 .75rem .5rem'
  },
  headerRight: {
    float: 'right',
    padding: '1.8rem 0 0 0'
  }
}

class Header extends Component {
  static propTypes = {
    path: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  goToCreateNamespace = () => {
    browserHistory.push('/namespaces/create')
  }

  handleButtonClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  render () {
    const {path} = this.props

    return (
      <div style={style.bar}>
        <h1 style={{...style.header, ...style.headerLeft}}>
          {path.join(' / ')}
        </h1>
        <h1 style={{...style.header, ...style.headerRight}}>
          <IconMenu
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            iconButtonElement={<IconButton style={{padding: '0'}}><Add color={theme.palette.alternateTextColor} /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem>Create Deployment</MenuItem>
            <MenuItem onTouchTap={this.goToCreateNamespace}>Create Namespace</MenuItem>
            <MenuItem>Create Project</MenuItem>
          </IconMenu>
        </h1>
      </div>
    )
  }
}

export default Header