import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import projectReducer from './store/reducers/project';
import markerReducer from './store/reducers/marker';
import criteriaReducer from './store/reducers/criteria';
import studentReducer from './store/reducers/student';
import groupReducer from './store/reducers/group';
import resultReducer from './store/reducers/result';
import commReducer from './store/reducers/comments';

//enable redux devtools
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  proj: projectReducer,
  marker: markerReducer,
  criteria: criteriaReducer,
  student: studentReducer,
  group: groupReducer,
  result: resultReducer,
  comment: commReducer
})

const store = createStore(rootReducer, enhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
