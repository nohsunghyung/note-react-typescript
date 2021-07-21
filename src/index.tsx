import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Router } from 'react-router-dom';
import history from './utils/history';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { configureStore } from '@reduxjs/toolkit';
import LoadingBar from './components/LoadingBar';

export const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      <LoadingBar />
    </Router>
  </Provider>,
  document.getElementById('root')
);
