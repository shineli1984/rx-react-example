import React from 'react';

/**
 * this is to wire subjects together with lifecycle events of a component
 *
 * @param componentName
 * @param subjects
 * @returns {*}
 */
const subscribe = (componentName, store, key) => {
  return React.createClass({
    componentWillMount: function () {

      this.disposable = store.subscribe(
        state => this.setState(state[key]),
        console.error.bind(console)
      );
    },

    render: function () {
      return React.createElement(componentName, Object.assign({}, this.state, this.props));
    },

    componentWillUnmount: function () {
      this.disposable.dispose();
    }
  });
};

export {subscribe};