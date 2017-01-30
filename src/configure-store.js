import appReducers from './modules'
import logger from 'redux-logger'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'

export const configureStore = (initialState, reducers, middlewares) => {
  const reducer = combineReducers({...appReducers, ...reducers})

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger())
  }

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = combineReducers({...require('./modules'), ...reducers})

      store.replaceReducer(nextReducer)
    })
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
  const store = createStore(reducer, initialState, enhancer)

  return store
}