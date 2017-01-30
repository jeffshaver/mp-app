import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import {fromJS} from 'immutable'
import goToDeployments from '../utilities/go-to-deployments'
import goToNamespaces from '../utilities/go-to-namespaces'
import gql from 'graphql-tag'
import ImmutablePropTypes from 'react-immutable-proptypes'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from './SelectField'
import {compose, graphql} from 'react-apollo'
import NamespacesQuery, {NamespacesQueryOptions} from '../queries/NamespacesQuery'
import ProjectsQuery, {ProjectsQueryOptions} from '../queries/ProjectsQuery'
import React, {Component, PropTypes} from 'react'

const SideBarQuery = gql`
  query SideBar {
    deployments {
      id
      name
      namespaceId
      status
    }
  }
`
const style = {
  selectField: {
    default: {
      width: '100%',
      padding: '0 1rem'
    },
    underline: {
      bottom: '22px',
      position: 'relative',
      width: '100%'
    }
  }
}

class SideBar extends Component {
  static propTypes = {
    deploymentId: PropTypes.string,
    deployments: ImmutablePropTypes.map.isRequired,
    muiTheme: PropTypes.object.isRequired,
    namespaceId: PropTypes.string,
    namespaces: ImmutablePropTypes.map.isRequired,
    projectId: PropTypes.string,
    projects: ImmutablePropTypes.map.isRequired
  }

  static defaultProps = {
    deployments: fromJS({
      data: []
    }),
    namespaces: fromJS({
      data: []
    }),
    projects: fromJS({
      data: []
    })
  }

  handleLogoClick = () => {
    browserHistory.push('/')
  }

  handleNamespaceClick = (data) => {
    const id = data.get('id')
    const projectId = data.get('projectId')

    goToDeployments(id, projectId)
  }

  handleProjectClick = (data) => {
    const id = data.get('id')

    goToNamespaces(id)
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
      deploymentId,
      deployments,
      namespaceId,
      namespaces,
      projectId,
      projects
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
        <SelectField
          data={deployments.get('data')}
          label={'Select a deployment'}
          style={style.selectField.default}
          textKey={'name'}
          underlineStyle={style.selectField.underline}
          value={deploymentId}
        />
        <SelectField
          data={namespaces.get('data')}
          label={'Select a namespace'}
          style={style.selectField.default}
          textKey={'name'}
          underlineStyle={style.selectField.underline}
          value={namespaceId}
          onItemTouchTap={(data) => {
            this.handleNamespaceClick(data)
          }}
        />
        <SelectField
          data={projects.get('data')}
          label={'Select a project'}
          style={style.selectField.default}
          textKey={'name'}
          underlineStyle={style.selectField.underline}
          value={projectId}
          onItemTouchTap={(data) => {
            this.handleProjectClick(data)
          }}
        />
        {
          /*
           * Loop through routes to generate menu items
          */
        }
      </Drawer>
    )
  }
}

export default compose(
  graphql(SideBarQuery, {
    props: ({data: {deployments}}) => ({
      deployments: fromJS({
        data: deployments
      })
    })
  }),
  graphql(NamespacesQuery, NamespacesQueryOptions),
  graphql(ProjectsQuery, ProjectsQueryOptions)
)(muiThemeable()(SideBar))