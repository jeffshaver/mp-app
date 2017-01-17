import loadingStyles from '../styles/loading'
import React, {Component, PropTypes} from 'react'

export default class Loading extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  static defaultProps = {
    message: 'Loading'
  }

  render () {
    const {message} = this.props

    return (
      <h1 style={loadingStyles}>{message}</h1>
    )
  }
}