import CardWrapper from './CardWrapper'
import FlatButton from 'material-ui/FlatButton'
import {fromJS} from 'immutable'
import goToDeployments from '../utilities/go-to-deployments'
import gql from 'graphql-tag'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import NamespacesQuery from '../queries/NamespacesQuery'
import ProjectsQuery from '../queries/ProjectsQuery'
import SelectField from './SelectField'
import TextField from 'material-ui/TextField'
import {compose, graphql} from 'react-apollo'
import React, {Component, PropTypes} from 'react'

const CreateNamespaceMutation = gql`
  mutation createNamespace($name: String!, $projectId: String!) {
    createNamespace(name: $name, projectId: $projectId) {
      metadata {
        annotations {
          projectId
        }
        name
        uid
      }
      status {
        phase
      }
    }
  }
`
const style = {
  input: {
    display: 'block'
  }
}

class CreateNamespace extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      projectId: ''
    }
  }

  static propTypes = {
    mutate: PropTypes.func,
    projects: ImmutablePropTypes.map.isRequired
  }

  static defaultProps = {
    projects: fromJS({
      data: []
    })
  }

  onChangeName = (event, name) => {
    this.setState({name})
  }

  onChangeProject = (project) => {
    const projectId = project.get('id')

    this.setState({projectId})
  }

  onSubmit = () => {
    const {mutate} = this.props
    const {name, projectId} = this.state

    mutate({
      variables: {
        name,
        projectId
      },
      refetchQueries: [{
        query: NamespacesQuery
      }]
    }).then(({data: {createNamespace: {metadata: {uid, annotations: {projectId}}}}}) => {
      goToDeployments(uid, projectId)
    })
  }

  render () {
    const {projectId} = this.state
    const {projects} = this.props

    return (
      <div>
        <Header
          path={['namespace', 'create']}
        />
        <CardWrapper
          actions={[
            <FlatButton
              key={'submit'}
              onClick={this.onSubmit}
            >
              Create
            </FlatButton>
          ]}
        >
          <TextField
            floatingLabelText={'Name'}
            name={'name'}
            style={style.input}
            value={this.state.name}
            onChange={this.onChangeName}
          />
          <SelectField
            data={projects.get('data')}
            label={'Select a project'}
            textKey={'name'}
            value={projectId}
            onItemTouchTap={this.onChangeProject}
          />
        </CardWrapper>
      </div>
    )
  }
}

export default compose(
  graphql(ProjectsQuery, {
    props: ({data: {projects: data}}) => ({
      projects: fromJS({
        data
      })
    })
  }),
  graphql(CreateNamespaceMutation)
)(CreateNamespace)