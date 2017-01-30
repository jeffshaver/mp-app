import {fromJS} from 'immutable'
import gql from 'graphql-tag'

const ProjectQuery = gql`
  query ProjectQuery {
    project(projectId: $projectId) {
      id
      name
    }
  }
`

export const ProjectQueryOptions = {
  options: ({params: {projectId}}) => ({
    variables: {projectId}
  }),
  props: ({data: {project}}) => ({
    project: fromJS(project)
  })
}

export default ProjectQuery