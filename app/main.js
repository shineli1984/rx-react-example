'use strict';

import Rx from 'rx';
import React from 'react';
import ReactDom from 'react-dom';
import {RandomNumberWrapper} from './routes/random-number.jsx';
import {Router, Route, IndexRoute} from 'react-router';
import {ready} from './intents/app.js';
import {FormWrapper} from './routes/form-example.jsx';
import {Root} from './routes/root.jsx';

Rx.config.longStackSupport = true;

const routes = (
    <Route path="/" component={Root}>
        <IndexRoute component={RandomNumberWrapper} />
        <Route path="form-example(/:email)" component={FormWrapper} />
    </Route>);

ReactDom.render(
    <Router routes={routes} />,
    document.getElementById('app')
);

ready.onNext();