'use strict';
import rx from 'rx';

const create = function(numberOfEvents = 1) {
    function subject(value) {
        subject.onNext(value);
    }

    for (var key in Rx.ReplaySubject.prototype) {
        subject[key] = Rx.ReplaySubject.prototype[key];
    }

    Rx.ReplaySubject.call(subject, numberOfEvents);

    return subject;
};

export default {create: create};