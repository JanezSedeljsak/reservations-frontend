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

export const getCourts = filters => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_COURTS_START });
        let url = `/courts/`;
        if (Object.keys(filters).length) {
            url += '?';
        }

        if (filters?.location) {
            url += `location=${filters.location}`;
        }

        if (filters?.search) {
            if (url[url.length - 1] !== '?') url += '&';
            url += `search=${filters.search}`;
        }

        if (filters?.courtType) {
            if (url[url.length - 1] !== '?') url += '&';
            url += `court_types=${filters.courtType}`;
        }

        apiRequest({
            url,
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