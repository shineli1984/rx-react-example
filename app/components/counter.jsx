'use strict';

import React from 'react';
import addAction from '../actions/increment.js';

export default class Counter extends React.Component {
    render() {
        return <li>
                <span>{this.props.count}</span>
            <br />
                <button onClick={addAction}>increase</button>
            </li>;
    }
}
