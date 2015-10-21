import rxReact from 'rx-react';

const emailChanged = rxReact.FuncSubject.create();
const formSubmitted = rxReact.FuncSubject.create();

export {emailChanged, formSubmitted};