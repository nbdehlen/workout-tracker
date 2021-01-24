import Reactotron from '../ReactotronConfig'
import { createStore, applyMiddleware, compose } from 'redux'
import authReducer from './auth/authReducer'
import axios from 'axios'
import { onRequest, onSuccess, onError } from './requests/interceptors'
import { handleRequests } from '@redux-requests/core'
import { createDriver } from '@redux-requests/axios'
import { persistCombineReducers, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import constants from '../api/constants'

export const configureStore = () => {
  const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['user'],
  }
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(
      axios.create({
        baseURL: constants.baseUrl,
      })
    ),
    onRequest,
    onSuccess,
    onError,
  })

  // const composeEnhancers =
  // (typeof window !== 'undefined' &&
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  // compose

  const reduxPersistReducers = persistCombineReducers(persistConfig, {
    user: authReducer,
    requests: requestsReducer,
  })

  const store = createStore(
    reduxPersistReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(Reactotron.createEnhancer(), applyMiddleware(...requestsMiddleware))
  )
  return store
}

export const persistor = persistStore(configureStore())

export default configureStore
