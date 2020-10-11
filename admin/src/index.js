import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { configureStore } from './redux/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';

// console.log(store.getState());
const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
