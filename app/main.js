import React from 'react';
import ReactDom from 'react-dom';
import RandomNumber from './components/random-number.jsx';
import RandomNumberStore from './stores/random-number.js';
import {ready} from './actions/app.js';
import rx from 'rx';

RandomNumberStore
    .subscribe(randomNumbers => {
        ReactDom.render(
            <RandomNumber {...randomNumbers}/>,
            document.getElementById('app')
        );
    }
);

ready.onNext();
