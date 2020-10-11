import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import postReducer from '../reducers/postReducer';
import authReducer from './auth/authReducer';
import userReducer from './users/userReducer';
import axios from 'axios';
import { onRequest, onSuccess, onError } from './requests/interceptors';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';

export const configureStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(
      axios,
      // axios.create({
      //   baseURL: 'http://localhost:5000',
      // }),
    ),
    onRequest,
    onSuccess,
    onError,
  });

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const reducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    requests: requestsReducer,
  });

  const store = createStore(
    reducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancers(applyMiddleware(...requestsMiddleware)),
  );
  return store;
};

export default configureStore;
