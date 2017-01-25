import {connect} from 'react-redux'
import {fetchNamespaces} from './modules/namespaces'
import {fetchProjects} from './modules/projects'
import {fetchUser} from './modules/user'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './components/Loading'
import {Map} from 'immutable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SideBar from './components/SideBar'
import React, {Component, PropTypes} from 'react'

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map.isRequired
  }
  static defaultProps = {
    user: Map()
  }

  componentDidMount () {
    const {dispatch, user} = this.props

    if (user.getIn(['data', 'authenticated'])) return

    dispatch(
      fetchUser()
    )
    .then((user) => {
      Promise.all([
        dispatch(fetchProjects(user.id)),
        dispatch(fetchNamespaces(user.id))
      ])
    })
  }

  render () {
    const {children, user} = this.props
    const content = user.getIn(['data', 'authenticated'])
      ? (
        <div
          style={{
            height: '100%',
            margin: '0 0 0 256px',
            position: 'relative'
          }}
        >
          <SideBar />
          {children}
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