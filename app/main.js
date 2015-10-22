'use strict';

import Rx from 'rx';
import React from 'react';
import ReactDom from 'react-dom';
import {RandomNumberWrapper} from './routes/random-number.jsx';
import {ready} from './intents/app.js';
import {FormWrapper} from './routes/form-example.jsx';
import createHistory from 'history/lib/createBrowserHistory';

Rx.config.longStackSupport = true;

const history = createHistory();

const Link = ({href, children}) => (
    <a href={href} onClick={(e) => e.preventDefault() || history.pushState({}, e.target.getAttribute('href'))}>{children}</a>
);

const App = ({children}) => (
    <div>
        <div><Link href="/">Random number</Link></div>
        <div><Link href="/form-example">Form example</Link></div>
        <div>{children}</div>
    </div>
);

const convertListener = (obj, funcationName) => {
    const ob = new Rx.Subject();

    const cbWrapper = (...args) => {
        ob.onNext(args);
    };
    obj[funcationName](cbWrapper);

    return ob;
};

const listen = convertListener(history, 'listen');

const listenBefore = convertListener(history, 'listenBefore');

listen
    .merge(Rx.Observable.just([document.location]))
    .pluck(0, 'pathname') // location
    .map(pathname =>
        pathname === '/' && <RandomNumberWrapper /> ||
        pathname === '/form-example' && <FormWrapper />
    )
    .subscribe(component => {
        ReactDom.render(<App>{component}</App>, document.getElementById('app'));
    });

listenBefore
    .subscribe(args => {
        console.log(args);
    });

ready.onNext();