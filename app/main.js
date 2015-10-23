'use strict';

import Rx from 'rx';
import React from 'react';
import ReactDom from 'react-dom';
import {RandomNumberWrapper} from './routes/random-number.jsx';
import {Router, Route, IndexRoute, Link} from 'react-router';
import {ready} from './intents/app.js';
import {FormWrapper} from './routes/form-example.jsx';
import {createHistory} from 'history';

Rx.config.longStackSupport = true;

const App = ({children}) => (
    <div>
        <div><Link to="/">Random number</Link></div>
        <div><Link to="/form-example">Form example</Link></div>
        <div>{children}</div>
    </div>
);

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={RandomNumberWrapper} />
        <Route path="form-example" component={FormWrapper} />
    </Route>);

ReactDom.render(
    <Router routes={routes} />,
    document.getElementById('app')
);

ready.onNext();