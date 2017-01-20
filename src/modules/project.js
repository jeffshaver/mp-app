// Selectors
export const getProject = (state, id) => {
  return state.projects.getIn(['data', id])
}