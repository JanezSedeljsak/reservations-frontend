import * as TYPE from '../store/types';
import { asFormData, apiRequest } from './helpers';

export const getManagementLocations = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_GET_LOCATIONS_START });
        apiRequest({
            url: '/management/locations/',
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

export const createManagmentLocation = ({ name, latitude, longitude, website_url }) => {
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

export const updateManagmentLocation = ({ id, name, latitude, longitude, owner, website_url }) => {
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