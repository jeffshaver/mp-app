import {fromJS} from 'immutable'
import gql from 'graphql-tag'

const NamespacesQuery = gql`
  query Namespaces {
    namespaces {
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

export const NamespacesQueryOptions = {
  props: ({data: {namespaces}}) => ({
    namespaces: fromJS({
      data: namespaces
    })
  })
}

export default NamespacesQuery