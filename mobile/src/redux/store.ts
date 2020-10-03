import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import rootReducer from './reducers'
export const store = createStore(rootReducer, middleware)
export const persistor = persistStore(store)