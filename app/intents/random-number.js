import FuncSubject from '../utilities/replay-func-subject.js';

const generate = FuncSubject.create(0, true);
const undo = FuncSubject.create(0, true);
const redo = FuncSubject.create(0, true);

export {generate, undo, redo};