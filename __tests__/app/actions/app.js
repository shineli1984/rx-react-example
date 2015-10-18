'use strict';

import rx from 'rx';

jest.dontMock('../../../app/actions/app');

const appActions = require('../../../app/actions/app.js');

describe('app actions', function() {
    it('has ready property', () => {
        expect(appActions.ready).toEqual(jasmine.any(rx.Subject));
    });
});