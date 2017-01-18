import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {fetchUser} from './modules/user'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './components/Loading'
import {Map} from 'immutable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SideBar from './components/SideBar'
import React, {Component, PropTypes} from 'react'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }
  static defaultProps = {
    user: Map()
  }

  componentDidMount () {
    const {dispatch, user} = this.props

    if (user.getIn(['data', 'authenticated'])) return

    // API: remove setTimeout
    setTimeout(() => {
      dispatch(fetchUser())
    }, 2000)
  }

  render () {
    const {user} = this.props
    const content = user.getIn(['data', 'authenticated'])
      ? (
        <div
          style={{
            padding: '0 0 0 110px'
          }}
        >
          <AppBar
            iconElementLeft={<span />}
            zDepth={0}
          />
          <SideBar />
        </div>
      )
      : (
        <Loading message={'Fetching User Data'} />
      )

    return (
      <MuiThemeProvider>
        {content}
      </MuiThemeProvider>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(App)