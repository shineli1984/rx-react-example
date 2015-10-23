import Rx from 'rx';
import React from 'react';
import createHistory from 'history/lib/createBrowserHistory';

const history = createHistory();

const Link = ({href, children}) => (
    <a href={href} onClick={(e) => e.preventDefault() || history.pushState({}, e.target.getAttribute('href'))}>{children}</a>
);

const convertListener = (obj, functionName) => {
    const ob = new Rx.Subject();

    const cbWrapper = (...args) => {
        ob.onNext(args);
    };
    obj[functionName](cbWrapper);

    return ob;
};

const listen = convertListener(history, 'listen');

const matchPathToComponentTree = routes => path => {
    const pathBrokenDown = path.split('/');
    const [firstPath, ...rest] = pathBrokenDown;
    const matchedRoutes = routes.filter(route => route.node.path === firstPath);

    if (matchedRoutes.length > 0) {
        if (matchedRoutes[0].children) {
            return React.createElement(
                matchedRoutes[0].node.component,
                undefined,
                matchPathToComponentTree(matchedRoutes[0].children)(rest.join('/'))
            );

        } else {
            return React.createElement(
                matchedRoutes[0].node.component
            );
        }
    }
    return null;
};

export {
    matchPathToComponentTree,
    history,
    Link,
    listen
};
