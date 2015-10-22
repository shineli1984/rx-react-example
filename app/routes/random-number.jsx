'use strict';

import React from 'react';
import {generate, undo, redo} from '../intents/random-number.js';
import {history} from '../stores/random-number.js';
import {subscribe} from '../utilities/wrapper.js';

const Arrow = ({index, currentIndex, values}) => (
    <span>{'<='}</span>
);

const CurrentNumber = ({number}) => (
    <div>{number}</div>
);

const HistoryEntry = ({index, currentIndex, values}) => (
    <div>
        {values[index]}
        {index === currentIndex && values.length > 0 &&
            <Arrow index={index} currentIndex={currentIndex} values={values} /> || null}
    </div>
);

const RandomNumber = ({values = [], index = null}) => (
    <div>
        <h1>Generate random number</h1>
        <div style={{display: "flex"}}>
            <div>
                <h2>Current value</h2>
                <CurrentNumber number={values[index]}/>

                <button onClick={generate}>Generate</button>
                <button disabled={index === null || index === -1} onClick={undo}>Undo</button>
                <button disabled={index === null || values.length === index + 1} onClick={redo}>Redo</button>
            </div>
            <div style={{marginLeft: '2em'}}>
                <h2>History</h2>
                {values.map((v, i) => <HistoryEntry key={i} index={i} currentIndex={index} values={values} />)}
            </div>
        </div>
    </div>
);

const RandomNumberWrapper = subscribe(RandomNumber, [history]);

export {RandomNumberWrapper}
