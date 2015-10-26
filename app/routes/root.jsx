import React from 'react';
import {Link} from 'react-router';
import css from '../css/main.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Root = ({children, location}) => (
    <div>
        <div><Link to="/">Random number</Link></div>
        <div><Link to="/form-example">Form example</Link></div>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300} component='div' style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <div key={location.pathname} className={'flex-item'}>
                {children}
            </div>
        </ReactCSSTransitionGroup>
    </div>
);

export {Root};