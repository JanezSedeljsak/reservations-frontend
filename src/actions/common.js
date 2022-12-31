import * as TYPE from '../store/types';
import { asFormData, apiRequest } from './helpers';

export const getCompanies = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_COMPANIES_START });
        apiRequest({
            url: '/users/?is_company=1',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.COMMON_GET_COMPANIES_SUCCESS,
                payload: { companies: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.COMMON_GET_COMPANIES_FAIL });
        });
    };
}

export const getCourtTypes = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_COURT_TYPES_START });
        apiRequest({
            url: '/court-types/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.COMMON_GET_COURT_TYPES_SUCCESS,
                payload: { courtTypes: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.COMMON_GET_COURT_TYPES_FAIL });
        });
    };
}

export const getLocations = ({ companyId }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_LOCATIONS_START });
        apiRequest({
            url: `/locations/?owner=${companyId}`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.COMMON_GET_LOCATIONS_SUCCESS,
                payload: { locations: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.COMMON_GET_LOCATIONS_FAIL });
        });
    };
}

export const getCourts = ({ location }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_COURTS_START });
        apiRequest({
            url: `/courts/?location=${location}`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.COMMON_GET_COURTS_SUCCESS,
                payload: { locationCourts: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.COMMON_GET_COURTS_FAIL });
        });
    };
}