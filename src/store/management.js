import * as TYPE from './types';

const initialState = {
    locations: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.MANAGEMENT_GET_LOCATIONS_START:
            return {...state, loading: true, locations: [] };
        case TYPE.MANAGEMENT_GET_LOCATIONS_SUCCESS:
            return {...state, loading: false, locations: action.payload.locations };
        case TYPE.MANAGEMENT_GET_LOCATIONS_FAIL:
            return {...state, loading: false, locations: [] };
        default:
            return state;
    }
}