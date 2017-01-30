import {fromJS} from 'immutable'
import gql from 'graphql-tag'

const NamespaceQuery = gql`
  query NamespaceQuery($namespaceId: String) {
    namespace(namespaceId: $namespaceId) {
      id
      name
    }
  }
`

export const NamespaceQueryOptions = {
  options: ({params: {namespaceId}}) => ({
    variables: {namespaceId}
  }),
  props: ({data: {namespace}}) => ({
    namespace: fromJS(namespace)
  })
}

export default NamespaceQuery