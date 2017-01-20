import getMuiTheme from 'material-ui/styles/getMuiTheme'
import React, {PropTypes} from 'react'

const theme = getMuiTheme()

const style = {
  background: theme.palette.primary1Color,
  color: theme.palette.alternateTextColor,
  margin: 0,
  padding: '2rem 0 .5rem'
}

const Header = ({children}) => (
  <h1 style={style}>{children}</h1>
)

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header