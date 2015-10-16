import {FuncSubject} from 'rx-react';

var undo = FuncSubject.create();
var redo = FuncSubject.create();

export {undo, redo};