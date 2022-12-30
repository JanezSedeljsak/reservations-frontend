import * as TYPE from './types';

const initialState = {
    locations: [],
    timeline: [],
    locationCourts: [],
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

        case TYPE.MANAGEMENT_GET_LOCATION_COURTS_START:
            return { ...state, loading: true, locationCourts: [] };
        case TYPE.MANAGEMENT_GET_LOCATION_COURTS_SUCCESS:
            return { ...state, loading: false, locationCourts: action.payload.locationCourts };
        case TYPE.MANAGEMENT_GET_LOCATION_COURTS_FAIL:
            return { ...state, loading: false, locationCourts: [] };

        case TYPE.MANAGEMENT_GET_SCHEDULE_START:
            return { ...state, loading: true, timeline: [] };
        case TYPE.MANAGEMENT_GET_SCHEDULE_SUCCESS:
            return { ...state, loading: false, timeline: action.payload.timeline };
        case TYPE.MANAGEMENT_GET_SCHEDULE_FAIL:
            return { ...state, loading: false, timeline: [] };

        default:
            return state;
    }
}