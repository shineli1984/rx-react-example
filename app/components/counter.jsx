'use strict';

import React from 'react';
import { increment, undo, redo } from '../actions/counter.js';

export default class Counter extends React.Component {
    render() {
        let number = Array(this.props.values[this.props.index]).fill(null);

        return <div>
                <div style={{display: 'flex'}}>
                {number.map((v, i) => <div key={i} style={{height: 100, width: 100, marginRight: 10, backgroundColor: 'red'}}></div>)}
                </div>
                <button onClick={increment}>Increase</button>
                <button disabled={number.length === 0} onClick={undo}>Undo</button>
                <button disabled={this.props.values.length === this.props.index + 1} onClick={redo}>Redo</button>
            </div>
            ;
    }
}
