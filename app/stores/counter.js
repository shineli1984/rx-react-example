import { ready } from '../actions/app.js';
import { undo, redo, increment } from '../actions/counter.js';
import rx from 'rx';

let store = new rx.Subject();

let storeStack = increment
    .merge(ready.map(() => 'ready'))
    .merge(undo.map(() => 'undo'))
    .merge(redo.map(() => 'redo'))
    .scan(
        (acc, value) =>
            value === 'ready' && acc ||

            value === 'undo' && {
                index: acc.index > 0 && acc.index - 1 || 0,
                values: acc.values
            } ||

            value === 'redo' && {
                index: acc.index < acc.values.length - 1 && acc.index + 1 || acc.values.length - 1,
                values: acc.values
            } ||

            {
                index: acc.index + 1,
                values: acc.values.slice(0, acc.index + 1).concat(acc.values[acc.index] + 1)
            },
        {values: [0], index: 0}
    )
    //.tap(console.log.bind(console))
    .subscribe(counts => {
        store.onNext(counts);
    });

export default store;