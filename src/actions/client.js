import * as TYPE from '../store/types';
import { apiRequest, asFormData } from './helpers';
import * as toast from './toast';

export const getReservations = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.CLIENT_GET_RESERVATIONS_START });
        apiRequest({
            url: '/reservations/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.CLIENT_GET_RESERVATIONS_SUCCESS,
                payload: { reservations: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.CLIENT_GET_RESERVATIONS_FAIL});
        });
    };
}

export const makeReservation = ({ schedule, date }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.CLIENT_CREATE_RESERVATION_START });
        apiRequest({
            url: '/reservations/',
            body: asFormData({ schedule, date }),
            method: 'POST',
            token: accessToken,
            okStatus: 201
        }).then((_) => {
            toast.success('Reservation was made!');
            dispatch({ type: TYPE.CLIENT_CREATE_RESERVATION_SUCCESS });
            dispatch(getManagementLocations(filters));
        }).catch((_) => {
            toast.error('Failed to make the reservation!');
            dispatch({ type: TYPE.CLIENT_CREATE_RESERVATION_FAIL });
        });
    }
}