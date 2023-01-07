import * as TYPE from '../store/types';
import { apiRequest } from './helpers';

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