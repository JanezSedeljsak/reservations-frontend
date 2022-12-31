import * as TYPE from './types';

const initialState = {
    companies: [],
    courtTypes: [],
    locationCourts: [],
    locations: [],
    loading: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.COMMON_GET_COMPANIES_START:
            return { ...state, loading: state.loading + 1, companies: [] };
        case TYPE.COMMON_GET_COMPANIES_SUCCESS:
            return { ...state, loading: state.loading - 1, companies: action.payload.companies };
        case TYPE.COMMON_GET_COMPANIES_FAIL:
            return { ...state, loading: state.loading - 1, companies: [] };

        case TYPE.COMMON_GET_COURT_TYPES_START:
            return { ...state, loading: state.loading + 1, courtTypes: [] };
        case TYPE.COMMON_GET_COURT_TYPES_SUCCESS:
            return { ...state, loading: state.loading - 1, courtTypes: action.payload.courtTypes };
        case TYPE.COMMON_GET_COURT_TYPES_FAIL:
            return { ...state, loading: state.loading - 1, courtTypes: [] };

        case TYPE.COMMON_GET_LOCATIONS_START:
            return { ...state, loading: state.loading + 1, locations: [] };
        case TYPE.COMMON_GET_LOCATIONS_SUCCESS:
            return { ...state, loading: state.loading - 1, locations: action.payload.locations };
        case TYPE.COMMON_GET_LOCATIONS_FAIL:
            return { ...state, loading: state.loading - 1, locations: [] };

        case TYPE.COMMON_GET_COURTS_START:
            return { ...state, loading: state.loading + 1, locationCourts: [] };
        case TYPE.COMMON_GET_COURTS_SUCCESS:
            return { ...state, loading: state.loading - 1, locationCourts: action.payload.locationCourts };
        case TYPE.COMMON_GET_COURTS_FAIL:
            return { ...state, loading: state.loading - 1, locationCourts: [] };

        default:
            return state;
    }
}