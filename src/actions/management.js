import * as TYPE from '../store/types';
import { asFormData, apiRequest } from './helpers';

export const getManagementLocations = filters => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        let url = '/management/locations/';
        if (filters?.search) {
            url += `?search=${filters.search}`;
        }

        dispatch({ type: TYPE.MANAGEMENT_GET_LOCATIONS_START });
        apiRequest({
            url,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_LOCATIONS_SUCCESS,
                payload: { locations: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_LOCATIONS_FAIL });
        });
    }
}

export const createManagementLocation = ({ name, latitude, longitude, website_url }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_START });
        apiRequest({
            url: '/management/locations/',
            body: asFormData({ name, latitude, longitude, website_url }),
            method: 'POST',
            token: accessToken,
            okStatus: 201
        }).then((_) => {
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_SUCCESS });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_FAIL });
        });
    }
}

export const updateManagementLocation = ({ id, name, latitude, longitude, owner, website_url }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_START });
        apiRequest({
            url: `/management/locations/${id}`,
            body: asFormData({ name, latitude, longitude, owner, website_url }),
            method: 'PUT',
            token: accessToken,
        }).then((_) => {
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_SUCCESS });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_FAIL });
        });
    }
}

export const getLocationCourts = (filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        let url = `/management/locations/${filters?.locationId}/courts/`;
        if (filters?.search) {
            url += `?search=${filters.search}`;
        }

        dispatch({ type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_START });
        apiRequest({
            url,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_SUCCESS,
                payload: { locationCourts: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_FAIL });
        });
    }
}

export const getManagementSchedule = ({ location, court }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_GET_SCHEDULE_START });
        apiRequest({
            url: `/schedules/?location=${location}&court=${court}`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_SCHEDULE_SUCCESS,
                payload: { timeline: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_SCHEDULE_FAIL });
        });
    }
};

export const getManagementAnalytics = ()  => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_GET_ANALYTICS_START });
        apiRequest({
            url: `/management/analytics/?type=court_detail`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_ANALYTICS_SUCCESS,
                payload: { analytics: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_ANALYTICS_FAIL});
        });
    }
}