'use strict';
import Rx from 'rx';

const create = function(numberOfEvents = 1, clone = false) {
    function subject(value) {
        subject.onNext(clone && Object.assign({}, value) || value);
    }

    for (let key in Rx.ReplaySubject.prototype) {
        subject[key] = Rx.ReplaySubject.prototype[key];
    }

    Rx.ReplaySubject.call(subject, numberOfEvents);

    return subject;
};

export default {create: create};