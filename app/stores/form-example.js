import validate from 'validate.js';
import update from 'react-addons-update';
import {emailChanged, formSubmitted} from '../intents/form-example.js';

const validations = {
    email: {
        email: true
    }
};

const data = emailChanged
    .pluck('target', 'value')
    .map(value => ({
        form: {
            email: value
        }
    }))
    .map(data => update(data, {
        errors: {$set: validate(data.form, validations)}
    }));

export {data};