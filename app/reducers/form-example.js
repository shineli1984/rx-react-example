import validate from 'validate.js';
import { intents } from '../intents/form-example.js';

const validations = {
  email: {
    email: true
  }
};

const form = (stateSoFar, action) =>

  action.type === intents.EMAIL_CHANGED &&
  {
    form: {
      email: action.value
    },
    errors: validate(
      {
        email: action.value
      },
      validations
    )
  };

export {
  form
};