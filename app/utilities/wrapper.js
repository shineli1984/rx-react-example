import React from 'react';
import monet from 'monet';
import Rx from 'rx';
import {RouteContext, Lifecycle} from 'react-router';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param component
 * @param subjects
 * @returns {*}
 */
const subscribe = (component, subjects = [], lifecycleSubjects = {}) => {

    return React.createClass({
        componentWillMount: function() {
            this.disposables = subjects.map(subject => subject.subscribe(partialState => {
                this.setState(partialState);
            }));

            monet.Maybe.fromNull(lifecycleSubjects.componentWillMount)
                .map(
                    subject => subject.onNext(this.props) || {}
                );
        },

        render: function() {
            return React.createElement(component, this.state);
        },

        componentWillUnmount: function() {
            this.disposables.forEach(disposable => disposable.dispose());
            monet.Maybe.fromNull(lifecycleSubjects.componentWillUnmount)
                .map(
                    subject => subject.onNext(this.props) || {}
            );
        }
    });
};

export {subscribe};