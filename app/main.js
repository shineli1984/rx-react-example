'use strict';

import Rx from 'rx';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {FormWrapper} from './routes/form-example.jsx';
import {Root} from './routes/root.jsx';
import { dispatcher, store } from './stores/main.js';
import { dispatchers } from './intents/form-example.js';

Rx.config.longStackSupport = true;

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={FormWrapper} onEnter={
      ({ params: { email }}) => email && dispatchers.dispatchEmailChangedAction(email)
    }/>

    <Route path="/(:email)"  component={FormWrapper} onEnter={
      ({ params: { email }}) => dispatchers.dispatchEmailChangedAction(email)
    }/>
  </Route>);

ReactDom.render(
  <Router routes={routes}/>,
  document.getElementById('app')
);
