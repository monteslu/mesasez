import 'isomorphic-fetch';
import es6p from 'es6-promise';
es6p.polyfill();
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './state';
import ConnectedApp from './pages/app';

import './index.css';

injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunkMiddleware));



render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={hashHistory}>
        <Route path="/" component={ConnectedApp} />
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
