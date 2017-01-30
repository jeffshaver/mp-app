import {fromJS} from 'immutable'
import Header from './Header'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from './Loading'
import {compose, graphql} from 'react-apollo'
import NamespaceQuery, {NamespaceQueryOptions} from '../queries/NamespaceQuery'
import ProjectQuery, {ProjectQueryOptions} from '../queries/ProjectQuery'
import React, {Component, PropTypes} from 'react'

// TODO: Handle error state
export class Namespace extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    namespace: ImmutablePropTypes.map,
    project: ImmutablePropTypes.map
  }

  static defaultProps = {
    isFetching: true,
    namespace: fromJS({}),
    project: fromJS({})
  }

  render () {
    const {isFetching, namespace, project} = this.props
    const header = (
      <Header
        path={[project.get('name', ''), namespace.get('name', '')]}
      />
    )

    if (isFetching) {
      return (
        <div>
          {header}
          <Loading />
        </div>
      )
    }

    if (!project || !namespace) return null

    return (
      <div>
        {header}
      </div>
    )
  }
}

export default compose(
  graphql(NamespaceQuery, NamespaceQueryOptions),
  graphql(ProjectQuery, ProjectQueryOptions)
)