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
    accessToken: null,
    refreshToken: null,
    isCompany: false,
    user: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_REGISTER_START:
            return { ...initialState, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false };
        case USER_REGISTER_FAIL:
            return {...initialState};
        case USER_LOGIN_START:
            return { ...initialState, loading: true };
        case USER_LOGIN_SUCCESS:
            const updateObj = {
                accessToken: action.payload.accessToken, 
                refreshToken: action.payload.refreshToken, 
                isCompany: action.payload.isCompany ?? true // this should default to false
            };

            return { ...state, loading: false,  ...updateObj};
        case USER_LOGIN_FAIL:
            return { ...initialState };
        case USER_LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}