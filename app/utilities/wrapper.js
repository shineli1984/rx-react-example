import React from 'react';
//import {Lifecycle, RouteContext} from 'react-router';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param componentName
 * @param subjects
 * @returns {*}
 */
const subscribe = (componentName, subjects = [], {componentWillMount, componentWillUnmount} = {}, routingCallbacks = {}) => {
    return React.createClass({
        //mixins: [Lifecycle, RouteContext], waiting for a bug fix to be merged into react-router 1.0.0

        componentWillMount: function() {
            this.disposables = subjects.map(subject => subject.subscribe(partialState => {
                this.setState(partialState);
            }));

            this.componentWillMountSubject = componentWillMount;
            this.componentWillUnmountSubject = componentWillUnmount;

            if (this.componentWillMountSubject) {
                this.componentWillMountSubject.onNext({
                    props: this.props,
                    state: this.state
                });
            }
        },

        render: function() {
            return React.createElement(componentName, this.state);
        },

        componentWillUnmount: function() {
            this.disposables.forEach(disposable => disposable.dispose());

            if (this.componentWillUnmountSubject) {
                this.componentWillUnmountSubject.onNext({
                    props: this.props,
                    state: this.state
                });
            }
        },

        //routerWillLeave: function() {
        //    if (routingCallbacks.routerWillLeave) return routingCallbacks.routerWillLeave();
        //    return true;
        //}
    });
};

export {subscribe};