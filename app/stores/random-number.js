import { ready } from '../actions/app.js';
import { undo, redo, generate } from '../actions/random-number.js';
import rx from 'rx';

const store = new rx.Subject();

const randomNumber = () => Math.ceil(Math.random() * 100);

const storeStack = generate
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
                values: acc.values.slice(0, acc.index + 1).concat(randomNumber())
            },
        {values: [randomNumber()], index: 0}
    )
    //.tap(console.log.bind(console))
    .subscribe(randomNumbers => {
        store.onNext(randomNumbers);
    });

export default store;