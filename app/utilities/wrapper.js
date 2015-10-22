import React from 'react';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param componentName
 * @param subjects
 * @returns {*}
 */
const subscribe = (componentName, subjects) => {
    return React.createClass({
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
        }
    });
};

export {subscribe};