import { ready } from '../actions/app.js';
import { undo, redo, generate } from '../actions/random-number.js';
import rx from 'rx';
import seed from 'seed-random';

const randomNumber = s => Math.ceil(seed(s)() * 100);

const history = generate
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
                values: acc.values.slice(0, acc.index + 1).concat(randomNumber(value.timeStamp))
            },
        {values: [], index: -1}
    );

const number = history
    .flatMapLatest(v => {
        // simulate a backend api call which will result in request sent earlier will come back after request sent later
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve(v), v.index %2 * 1000);
        });
        return promise;
    })
    .map(({values, index}) => values[index]);

export {number, history};
