import React from 'react';
import { dispatcher, store } from '../stores/main.js';
import { dispatchers } from '../intents/form-example.js';
import { subscribe } from '../utilities/wrapper.js';

const Error = ({error}) => <div>{error}</div>;

const Form = ({form = {}, errors = {email: []}, params}) => (
    <div>
        <h1>Form and validation</h1>
        <form>
            <label>input</label><br/>
            <input name="email" type="text" value={form.email || params.email} onChange={
              ({ target: { value } }) => dispatchers.dispatchEmailChangedAction(value)
            } />
            {errors.email.map(
                (error, i) => <Error key={i} error={error}></Error>)}
        </form>
    </div>
);

const FormWrapper = subscribe(
    Form,
    store,
    'formExample'
);

export { FormWrapper };