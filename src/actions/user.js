import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_FAIL,
    USER_REGISTER_START,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT
} from '../store/types';

import { asFormData, apiRequest } from './helpers';

export const userLogin = ({ username, password }) => {
    return async (dispatch) => {
        dispatch({ type: USER_LOGIN_START });
        apiRequest({
            url: '/auth/token/',
            body: asFormData({ username, password }),
            method: 'POST'
        }).then((res) => {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: { accessToken: res?.access, refreshToken: res?.refresh, isManagement: res?.isManagement } });
        }).catch((_) => {
            dispatch({ type: USER_LOGIN_FAIL });
        });
    }
}

export const userRegister = ({ username, email, password, first_name, last_name }) => {
    return (dispatch) => {
        dispatch({ type: USER_REGISTER_START });
        apiRequest({
            url: '/auth/register/',
            body: asFormData({ username, email, password, first_name, last_name }),
            method: 'POST',
            okStatus: 201
        }).then((_) => {
            dispatch({ type: USER_REGISTER_SUCCESS });
            dispatch(userLogin({ username, password }));
        }).catch((_) => {
            dispatch({ type: USER_REGISTER_FAIL });
        });
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT });
    }
}