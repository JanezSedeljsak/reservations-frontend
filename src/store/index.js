import { combineReducers } from 'redux';
import user from './user';
import management from './management';
import common from './common';

const rootReducer = combineReducers({
    user,
    management,
    common
});

export default rootReducer;