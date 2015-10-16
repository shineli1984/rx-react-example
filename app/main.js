import React from 'react';
import ReactDom from 'react-dom';
import Counter from './components/counter.jsx';
import CountStore from './stores/counter.js';
import {ready} from './actions/app.js';
import rx from 'rx';

CountStore
    .subscribe(count => {
        ReactDom.render(
            <Counter {...count} key={count.count}/>,
            document.getElementById('app')
        );
    }
);

ready.onNext();
