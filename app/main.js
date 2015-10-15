import React from 'react';
import ReactDom from 'react-dom';
import Counter from './components/counter.jsx';
import CountStore from './stores/counter.js';
import {ready} from './actions/app.js';
import rx from 'rx';

CountStore
    .scan((acc, x) => {
        return acc.concat(x);
    }, [])
    .subscribe(counts => {
        ReactDom.render(
            <ul>
                {counts.map(count => <Counter {...count} key={count.count}/>)}
            </ul>,
            document.getElementById('app')
        );
    }
);

ready.onNext();
