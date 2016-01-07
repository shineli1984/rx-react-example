import { dispatcher } from '../stores/main.js';

const intents = {
  EMAIL_CHANGED: 'EMAIL_CHANGED'
};

const emailChangedAction = email => ({
  type: intents.EMAIL_CHANGED,
  value: email
});

const dispatchEmailChangedAction = email => dispatcher.onNext(emailChangedAction(email));

const dispatchers = {
  dispatchEmailChangedAction
};

export {
  intents,
  dispatchers
};