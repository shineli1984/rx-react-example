import { undo, redo, generate } from '../intents/random-number.js';
import seed from 'seed-random';

const randomNumber = s => Math.ceil(seed(s)() * 100);

const history = generate
    .merge(undo.map(() => 'undo'))
    .merge(redo.map(() => 'redo'))
    .shareReplay()
    .scan(
        (acc, value) =>
            value === 'undo' && {
                index: acc.index >= 0 ? acc.index - 1 : -1,
                values: acc.values
            } ||

            value === 'redo' && {
                index: acc.index <= acc.values.length - 1 ? acc.index + 1 : acc.values.length - 1,
                values: acc.values
            } ||

            {
                index: acc.index + 1,
                values: acc.values.slice(0, acc.index + 1).concat(randomNumber(value.timeStamp))
            },
        {values: [], index: -1}
    );

export {history};
