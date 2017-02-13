import {fromJS} from 'immutable'
import gql from 'graphql-tag'

const UserQuery = gql`
  query User {
    user {
      authenticated
      id
      username
    }
  }
`

export const UserQueryOptions = {
  props: ({data: {user}}) => ({
    user: fromJS({
      data: user
    })
  })
}

export default UserQuery