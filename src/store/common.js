import * as TYPE from './types';

const initialState = {
    companies: [],
    courtTypes: [],
    locationCourts: [],
    locations: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.COMMON_GET_COMPANIES_START:
            return { ...state, loading: true, companies: [] };
        case TYPE.COMMON_GET_COMPANIES_SUCCESS:
            return { ...state, loading: false, companies: action.payload.companies };
        case TYPE.COMMON_GET_COMPANIES_FAIL:
            return { ...state, loading: false, companies: [] };

        case TYPE.COMMON_GET_COURT_TYPES_START:
            return { ...state, loading: true, courtTypes: [] };
        case TYPE.COMMON_GET_COURT_TYPES_SUCCESS:
            return { ...state, loading: false, courtTypes: action.payload.courtTypes };
        case TYPE.COMMON_GET_COURT_TYPES_FAIL:
            return { ...state, loading: false, courtTypes: [] };

        case TYPE.COMMON_GET_LOCATIONS_START:
            return { ...state, loading: true, locations: [] };
        case TYPE.COMMON_GET_LOCATIONS_SUCCESS:
            return { ...state, loading: false, locations: action.payload.locations };
        case TYPE.COMMON_GET_LOCATIONS_FAIL:
            return { ...state, loading: false, locations: [] };

        case TYPE.COMMON_GET_COURTS_START:
            return { ...state, loading: true, locationCourts: [] };
        case TYPE.COMMON_GET_COURTS_SUCCESS:
            return { ...state, loading: false, locationCourts: action.payload.locationCourts };
        case TYPE.COMMON_GET_COURTS_FAIL:
            return { ...state, loading: false, locationCourts: [] };

        default:
            return state;
    }
}