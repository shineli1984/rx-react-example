'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import RandomNumber from './components/random-number.jsx';
import {history} from './stores/random-number.js';
import {ready} from './actions/app.js';

history
    .subscribe(randomNumbers => {
        ReactDom.render(
            <RandomNumber {...randomNumbers}/>,
            document.getElementById('app')
        );
    }
);

ready.onNext();
