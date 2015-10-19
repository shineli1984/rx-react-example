'use strict';

import React from 'react';
import Component from '../utils/component.js';
import { generate, undo, redo } from '../actions/random-number.js';
import { number } from '../stores/random-number.js';
import ReactDom from 'react-dom';

const Arrow = ({index, currentIndex, values}) => (
    <span>{'<='}</span>
);

const CurrentNumber = ({number}) => (
    <span>{number}</span>
);

const HistoryEntry = ({index, currentIndex, values}) => (
    <div>
        {values[index]}
        {index === currentIndex && values.length > 1 && <Arrow index={index} currentIndex={currentIndex} values={values} /> || null}
    </div>
);

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
                        {values.map((v, i) => <HistoryEntry key={i} index={i} currentIndex={index} values={values} />)}
                    </div>
                </div>
            </div>
            ;
    }

    componentDidMount() {
        number.subscribe(number => {
            ReactDom.render(<CurrentNumber number={number}/>, this.refs.currentNumber);
        });
    }
}
