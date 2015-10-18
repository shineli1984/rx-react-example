import {FuncSubject} from 'rx-react';

const generate = FuncSubject.create();
const undo = FuncSubject.create();
const redo = FuncSubject.create();

export {generate, undo, redo};