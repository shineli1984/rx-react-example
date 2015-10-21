import FuncSubject from '../utilities/replay-func-subject.js';

const generate = FuncSubject.create(0);
const undo = FuncSubject.create(0);
const redo = FuncSubject.create(0);

export {generate, undo, redo};