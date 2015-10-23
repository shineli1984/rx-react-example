'use strict';

import Rx from 'rx';
import React from 'react';
import ReactDom from 'react-dom';
import {ready} from './intents/app.js';
import {RandomNumberWrapper} from './routes/random-number.jsx';
import {FormWrapper} from './routes/form-example.jsx';
import {history, listen, matchPathToComponentTree} from './utilities/routing.js';

import App from './routes/app.jsx'

Rx.config.longStackSupport = true;

const tree = [{
    children: [
        {
            node: {
                path: '',
                component: RandomNumberWrapper
            }
        },
        {
            node: {
                path: 'form-example',
                component: FormWrapper
            }
        }
    ],
    node: {
        path: '',
        component: App
    }
}];

const matchPathToComponentTreeWithRoutes = matchPathToComponentTree(tree);

listen
    .merge(Rx.Observable.just([document.location]))
    .pluck(0, 'pathname')
    .map(matchPathToComponentTreeWithRoutes)
    .subscribe(component => {
        ReactDom.render(component, document.getElementById('app'));
    });

ready.onNext();