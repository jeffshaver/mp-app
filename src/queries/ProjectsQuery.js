import {fromJS} from 'immutable'
import gql from 'graphql-tag'

const ProjectsQuery = gql`
  query Projects {
    projects {
      id
      name
      status
    }
  }
`

export const ProjectsQueryOptions = {
  props: ({data: {projects: data}}) => ({
    projects: fromJS({data})
  })
}

export default ProjectsQuery