import FuncSubject from '../utilities/replay-func-subject.js';

const emailChanged = FuncSubject.create(1);
const formSubmitted = FuncSubject.create(1);

export {emailChanged, formSubmitted};