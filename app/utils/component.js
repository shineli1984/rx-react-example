'use strict';

import React from 'react';

export default class Component extends React.Component {
    constructor() {
        super(arguments);
        this.subscriptions = [];
    }

    componentWillUnmount() {
        super.componentWillUnmount(arguments);
        this.subscriptions.each(subscription => {
            subscription.dispose();
        });
    }
};