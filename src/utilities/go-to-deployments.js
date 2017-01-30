import {browserHistory} from 'react-router'

export default (namespaceId, projectId) => {
  browserHistory.push(`/projects/${projectId}/namespaces/${namespaceId}/deployments`)
}