import incremental from '../actions/increment.js';
import { ready } from '../actions/app.js';
import rx from 'rx';

let store = new rx.Subject();
let number = 0;

incremental
    .subscribe(() => {
        number = number + 1;
        store.onNext({count: number});
    });

ready
    .subscribe(() => {
        store.onNext({count: number});
    });

export default store;