'use strict';

import React from 'react';
import addAction from '../actions/increment.js';
import { undo } from '../actions/undo-redo.js';

export default class Counter extends React.Component {
    render() {
        let number = Array(this.props.count).fill(null);

        return <div>
                <div style={{display: 'flex'}}>
                {number.map((v, i) => <div key={i} style={{height: 100, width: 100, marginRight: 10, backgroundColor: 'red'}}></div>)}
                </div>
                <button onClick={addAction}>increase</button>
                <button onClick={undo}>undo</button>
            </div>
            ;
    }
}
