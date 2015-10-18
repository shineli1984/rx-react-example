import rx from 'rx';

jest.dontMock('../../../app/actions/random-number.js');

const randomNumberActions = require("../../../app/actions/random-number.js");

describe('random number actions', () => {
    it('has generate function subject', () => {
        const value = 1;
        randomNumberActions.generate.subscribe(v => expect(v).toBe(value));
        randomNumberActions.generate(value);
    });

    it('has undo subject', () => {
        const value = 1;
        randomNumberActions.redo.subscribe(v => expect(v).toBe(value));
        randomNumberActions.redo(value);
    });

    it('has redo subject', () => {
        const value = 1;
        randomNumberActions.undo.subscribe(v => expect(v).toBe(value));
        randomNumberActions.undo(value);
    });
});