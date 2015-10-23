import React from 'react';
import {Link} from '../utilities/routing.js';

const App = ({children}) => (
    <div>
        <div><Link href="/">Random number</Link></div>
        <div><Link href="/form-example">Form example</Link></div>
        <div>{children}</div>
    </div>
);

export default App;