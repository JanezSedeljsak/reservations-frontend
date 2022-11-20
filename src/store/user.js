import {
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL
} from './types';

const initialState = {
    user: {},
    jwt: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_REGISTER_START:
            return { ...initialState, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, jwt: action.payload.jwt, user: action.payload.user };
        case USER_REGISTER_FAIL:
            return {...initialState};
        case USER_LOGIN_START:
            return { ...initialState, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, jwt: action.payload.jwt, user: action.payload.user };
        case USER_LOGIN_FAIL:
            return { ...initialState };
        case USER_LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}