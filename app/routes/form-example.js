import React from 'react';
import {subscribe} from '../utilities/wrapper.js';
import {emailChanged} from '../intents/form-example.js';
import {data} from '../stores/form-example.js';

const Error = ({error}) => <div>{error}</div>;

// component
const Form = ({form = {}, errors = {email: []}}) => (
    <div>
        <h1>Form and validation</h1>
        <form>
            <label>input</label><br/>
            <input name="email" type="text" value={form.email} onChange={emailChanged} />
            {errors.email.map(
                (error, i) => <Error key={i} error={error}></Error>)}
        </form>
    </div>
);

// wire up observables
const FormWrapper = subscribe(
    Form,
    [data]
);

export {FormWrapper};