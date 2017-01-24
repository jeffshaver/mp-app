import {combineReducers} from 'redux'
import namespaces from './namespaces'
import projects from './projects'
import user from './user'

export default combineReducers({
  namespaces,
  projects,
  user
})