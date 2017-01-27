export const checkFetchStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  return response.text().then((error) => {
    const err = new Error(error)

    err.response = response

    throw err
  })
}

export const filterByKey = (list, value, key = 'id') => {
  return list.filter((listItem) => {
    return listItem.get(key) === value
  })
}

export const findById = (list, id, idKey) => {
  const index = list.findIndex((listItem) => {
    return listItem.get('id') === id
  })

  return list.get(index)
}

export const handleFailure = (fail) => {
  return (dispatch, error) => {
    dispatch(fail(error))

    return Promise.reject(error)
  }
}

export const handleSuccess = (success, key) => {
  return (dispatch, json) => {
    dispatch(success(json.data[key]))

    return Promise.resolve(json.data[key])
  }
}

export const updateById = (list, id, update) => {
  const index = list.findIndex((listItem) => {
    return listItem.get('id') === id
  })

  return list.mergeIn(['data', index], update)
}