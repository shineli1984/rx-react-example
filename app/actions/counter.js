import {FuncSubject} from 'rx-react';

const increment = FuncSubject.create();
const undo = FuncSubject.create();
const redo = FuncSubject.create();

export {increment, undo, redo};