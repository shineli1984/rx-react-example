import Rx from 'rx';
import r from 'ramda';
import { form } from '../reducers/form-example.js';

const dispatcher = new Rx.ReplaySubject();

const combineReducers = reducers => (stateSoFar, action) => {
  const keys = r.keys(reducers);
  const values = keys.map(prop =>
      reducers[prop](stateSoFar[prop], action)
  );

  return r.zipObj(
    keys,
    values
  );
};

const createStore = (reducers, initialState = {}) => dispatcher.scan(combineReducers(reducers), initialState);

const store = createStore(
  { formExample: form },
  {
    formExample: {
      form: {
        email: ''
      }
    }
  }
);

export {
  dispatcher,
  store
};

