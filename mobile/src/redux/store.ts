import Reactotron from '../ReactotronConfig'
import { createStore, applyMiddleware, compose, Reducer, Action } from 'redux'
import authReducer from './auth/authReducer'
import axios, { AxiosError } from 'axios'
import { onRequest, onSuccess, onError } from './requests/interceptors'
import { handleRequests } from '@redux-requests/core'
import { createDriver } from '@redux-requests/axios'
import { persistCombineReducers, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import constants from '../api/constants'
import { UserState } from './auth/actionTypes'

export type RequestsStateQueries = {
  TEST: RequestQuery<{
    data: string
  }>
}

export type RequestQuery<T> = {
  data: T
  loading: boolean
  error: AxiosError
  pristine: boolean
}

export type RequestsState = {
  queries: RequestsStateQueries
  mutations: {}
  cache: {}
  requestsKeys: {}
  normalizedData: {}
}

export type MainState = {
  user: UserState
  requests: RequestsState
}

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

  const reduxPersistReducers = persistCombineReducers<MainState>(
    persistConfig,
    {
      user: authReducer,
      requests: requestsReducer,
    }
  )

  const store = createStore(
    reduxPersistReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(Reactotron.createEnhancer(), applyMiddleware(...requestsMiddleware))
  )
  return store
}

export const persistor = persistStore(configureStore())

export default configureStore
