import React from 'react';
import {Lifecycle, RouteContext} from 'react-router';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param componentName
 * @param subjects
 * @returns {*}
 */
const subscribe = (componentName, subjects = [], routingCallbacks = {}) => {
    return React.createClass({
        mixins: [Lifecycle, RouteContext],

        componentWillMount: function() {
            this.disposables = subjects.map(subject => subject.subscribe(partialState => {
                this.setState(partialState);
            }));
        },

        render: function() {
            return React.createElement(componentName, this.state);
        },

        componentWillUnmount: function() {
            this.disposables.forEach(disposable => disposable.dispose());
        },

        routerWillLeave: function() {
            if (routingCallbacks.routerWillLeave) return routingCallbacks.routerWillLeave();
            return true;
        }
    });
};

export {subscribe};