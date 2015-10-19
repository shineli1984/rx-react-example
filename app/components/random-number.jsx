'use strict';

import React from 'react';
import Component from '../utils/component.js';
import { generate, undo, redo } from '../actions/random-number.js';
import { number } from '../stores/random-number.js';
import ReactDom from 'react-dom';

export default class RandomNumber extends Component {

    render() {
        const {values, index} = this.props;

        return <div>
                <h1>Generate random number</h1>
                <div style={{display: "flex"}}>
                    <div>
                        <h2>Current value</h2>
                        <div ref="currentNumber"></div>

                        <button onClick={generate}>Generate</button>
                        <button disabled={index === 0} onClick={undo}>Undo</button>
                        <button disabled={values.length === index + 1} onClick={redo}>Redo</button>
                    </div>
                    <div style={{marginLeft: '2em'}}>
                        <h2>History</h2>
                        {values.map((v, i) => <div key={i}>
                            {v} <span>{i === index && values.length > 1 && "<=" || ""}</span>
                        </div>)}
                    </div>
                </div>
            </div>
            ;
    }

    componentDidMount() {
        number.subscribe(number => {
            ReactDom.render(<span>{number}</span>, this.refs.currentNumber);
        });
    }
}
