import { combineReducers } from 'redux';
import user from './user';
import management from './management';
import common from './common';
import client from './client';

const rootReducer = combineReducers({
    user,
    management,
    common,
    client
});

export default rootReducer;