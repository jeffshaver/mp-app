import AppBar from 'material-ui/AppBar'
import Loading from './components/Loading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// REDUX: add PropTypes import back in
import React, {Component} from 'react'

class App extends Component {
  // REDUX: add this back in
  // static propTypes = {
  //   user: PropTypes.object.isRequired
  // }
  // static defaultProps = {
  //   user: {}
  // }

  // REDUX: remove constructor
  constructor (props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    // REDUX: change this.state to this.props
    const {user} = this.state

    if (user.authenticated) return

    // API: replace with fetch call when api exists
    setTimeout(() => {
      this.setState({
        user: {
          username: 'jeff',
          authenticated: true
        }
      })
    }, 2000)
  }

  render () {
    // REDUX: change this.state to this.props
    const {user} = this.state
    const content = user.authenticated
      ? (
        <AppBar
          title="MP"
        />
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

export default App