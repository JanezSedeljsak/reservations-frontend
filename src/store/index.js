import { combineReducers } from 'redux';
import user from './user';
import management from './management';

const rootReducer = combineReducers({
    user,
    management
});

export default rootReducer;