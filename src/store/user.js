import * as TYPE from './types';

const initialState = {
    accessToken: null,
    refreshToken: null,
    profile: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.USER_REGISTER_START:
        case TYPE.USER_LOGIN_START:
            return { ...initialState, loading: true };

        case TYPE.USER_GET_START:
        case TYPE.USER_PROFILE_UPDATE_START:
            return { ...state, loading: true };

        case TYPE.USER_REGISTER_SUCCESS:
            return { ...state, loading: false };
        case TYPE.USER_LOGIN_SUCCESS:
            const updateObj = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };

            return { ...state, loading: false, ...updateObj };
        case TYPE.USER_GET_SUCCESS:
        case TYPE.USER_PROFILE_UPDATE_SUCCESS:
            return {
                ...state, loading: false, profile: {
                    ...state.profile,
                    ...action.payload.profile
                }
            };

        case TYPE.USER_PROFILE_UPDATE_FAIL:
            return { ...state, loading: false };

        // fails
        case TYPE.USER_REGISTER_FAIL:
        case TYPE.USER_LOGIN_FAIL:
        case TYPE.USER_GET_FAIL:
        case TYPE.USER_LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}