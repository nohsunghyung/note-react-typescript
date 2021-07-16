import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import history from './utils/history';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { configureStore, createStore } from '@reduxjs/toolkit';
import LoadingBar from './components/LoadingBar';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />,
      <LoadingBar />
    </Router>
  </Provider>,
  document.getElementById('root')
);
