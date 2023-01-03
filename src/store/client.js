import * as TYPE from './types';

const initialState = {
    reservations: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.CLIENT_GET_RESERVATIONS_START:
            return { ...state, loading: true, reservations: [] };
        case TYPE.CLIENT_GET_RESERVATIONS_SUCCESS:
            return { ...state, loading: false, reservations: action.payload.reservations };
        case TYPE.CLIENT_GET_RESERVATIONS_FAIL:
            return { ...state, loading: false, reservations: [] };

        default:
            return state;
    }
}