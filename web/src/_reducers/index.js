import { combineReducers } from 'redux';

import { authentication } from './authentication_reducer';
import { alert } from './alert_reducer';

const rootReducer = combineReducers({
  authentication,
  alert
});

export default rootReducer;