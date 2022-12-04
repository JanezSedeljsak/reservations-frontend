import * as TYPE from '../store/types';
import { asFormData, apiRequest } from './helpers';
import { getManagementLocations } from './management';
import { getCompanies } from './common';

export const userLogin = ({ username, password }) => {
    return async (dispatch) => {
        dispatch({ type: TYPE.USER_LOGIN_START });
        apiRequest({
            url: '/auth/token/',
            body: asFormData({ username, password }),
            method: 'POST'
        }).then((res) => {
            dispatch({ type: TYPE.USER_LOGIN_SUCCESS, payload: { accessToken: res?.access, refreshToken: res?.refresh } });
            dispatch(getCurrentUser());
            dispatch(getCompanies());
            if (res?.is_company) {
                dispatch(getManagementLocations());
            }
        }).catch((_) => {
            dispatch({ type: TYPE.USER_LOGIN_FAIL });
        });
    }
}

export const userRegister = ({ username, email, password, first_name, last_name }) => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_REGISTER_START });
        apiRequest({
            url: '/auth/register/',
            body: asFormData({ username, email, password, first_name, last_name }),
            method: 'POST',
            okStatus: 201
        }).then((_) => {
            dispatch({ type: TYPE.USER_REGISTER_SUCCESS });
            dispatch(userLogin({ username, password }));
        }).catch((_) => {
            dispatch({ type: TYPE.USER_REGISTER_FAIL });
        });
    }
}

export const updateProfile = ({ id, phone, bio, location, birth_date }) => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_PROFILE_UPDATE_START });
        apiRequest({
            url: `/users/${id}/`,
            body: asFormData({ phone, bio, location, birth_date }),
            method: 'PATCH',
        }).then((_) => {
            dispatch({ type: TYPE.USER_PROFILE_UPDATE_SUCCESS });
        }).catch((_) => {
            dispatch({ type: TYPE.USER_PROFILE_UPDATE_FAIL });
        });
    }
}

export const getCurrentUser = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.USER_GET_START });
        apiRequest({
            url: '/users/current/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({ type: TYPE.USER_GET_SUCCESS, payload: { profile: res } });
            if (res?.is_company) {
                dispatch(getManagementLocations());
            }
        }).catch((_) => {
            dispatch({ type: TYPE.USER_GET_FAIL });
        });
    };
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_LOGOUT });
    }
}

export const isUserCompany = state => !!state.user?.profile?.is_company ?? false;
export const isProfileLoaded = state => state?.user?.profile?.id ?? false;