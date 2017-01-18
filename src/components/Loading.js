import CircularProgress from 'material-ui/CircularProgress'
import loadingStyles, {circularProgressStyles} from '../styles/loading'
import React, {Component, PropTypes} from 'react'

class Loading extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  static defaultProps = {
    message: 'Loading'
  }

  render () {
    const {message} = this.props

    return (
      <div style={loadingStyles}>
        <CircularProgress
          size={80}
          style={circularProgressStyles}
          thickness={5}
        />
        <h1>{message}</h1>
      </div>
    )
  }
}

export default Loading