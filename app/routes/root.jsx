import React from 'react';
import {Link} from 'react-router';

const Root = ({children}) => (
    <div>
        <div><Link to="/">Random number</Link></div>
        <div><Link to="/form-example">Form example</Link></div>
        <div>{children}</div>
    </div>
);

export {Root};