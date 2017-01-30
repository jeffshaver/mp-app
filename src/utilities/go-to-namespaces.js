import {browserHistory} from 'react-router'

export default (projectId) => {
  browserHistory.push(`/projects/${projectId}/namespaces`)
}