import {header} from '../styles/common'
import React, {PropTypes} from 'react'

const Header = ({children}) => (
  <h1 style={header}>{children}</h1>
)

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header