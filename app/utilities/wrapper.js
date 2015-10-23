import React from 'react';
import Rx from 'rx';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param component
 * @param subjects
 * @returns {*}
 */
const subscribe = (component, subjects = []) => {

    return React.createClass({
        componentWillMount: function() {
            this.disposables = subjects.map(subject => subject.subscribe(partialState => {
                this.setState(partialState);
            }));
        },

        render: function() {
            return React.createElement(component, this.state);
        },

        componentWillUnmount: function() {
            this.disposables.forEach(disposable => disposable.dispose());
        }
    });
};

export {subscribe};