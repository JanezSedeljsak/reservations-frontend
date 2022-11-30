import {
    MANAGEMENT_GET_LOCATIONS_START,
    MANAGEMENT_GET_LOCATIONS_SUCCESS,
    MANAGEMENT_GET_LOCATIONS_FAIL,
} from '../store/types';

import { asFormData, apiRequest } from './helpers';

export const getManagementLocations = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: MANAGEMENT_GET_LOCATIONS_START });
        apiRequest({
            url: '/management/locations/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: MANAGEMENT_GET_LOCATIONS_SUCCESS,
                payload: { locations: res?.results ?? [] }
            });
        }).catch((status) => {
            dispatch({ type: MANAGEMENT_GET_LOCATIONS_FAIL });
        });
    }
}