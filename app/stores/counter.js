import increment from '../actions/increment.js';
import { ready } from '../actions/app.js';
import { undo, redo } from '../actions/undo-redo.js';
import rx from 'rx';

let store = new rx.Subject();

let storeStack = increment
    .merge(ready.map(() => 'ready'))
    .merge(undo.map(() => 'undo'))
    .scan(
        (acc, value) =>
            value === 'ready' && acc ||

            value === 'undo' && {
                value: acc.values[acc.values.length - 2] || 0,
                values: acc.values.slice(0, acc.values.length - 1)
            } ||

            {
                value: acc.value + 1,
                values: acc.values.concat(acc.value + 1)
            },
        {value: 0, values: []}
    )
    .pluck('value')
    .filter(v => v !== undefined)
    .distinctUntilChanged()
    .subscribe(count => {
        store.onNext({count: count});
    });

export default store;