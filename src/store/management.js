import * as TYPE from './types';

const initialState = {
    locations: [],
    timeline: [],
    locationCourts: [],
    analytics: [],
    scheduleDetail: {},
    loading: false,
    actionInProgress: false,
    detailLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.MANAGEMENT_GET_LOCATIONS_START:
            return { ...state, loading: true, locations: [] };
        case TYPE.MANAGEMENT_GET_LOCATIONS_SUCCESS:
            return { ...state, loading: false, locations: action.payload.locations };
        case TYPE.MANAGEMENT_GET_LOCATIONS_FAIL:
            return { ...state, loading: false, locations: [] };

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

        case TYPE.MANAGEMENT_GET_ANALYTICS_START:
            return { ...state, loading: true, analytics: [] };
        case TYPE.MANAGEMENT_GET_ANALYTICS_SUCCESS:
            return { ...state, loading: false, analytics: action.payload.analytics };
        case TYPE.MANAGEMENT_GET_ANALYTICS_FAIL:
            return { ...state, loading: false, analytics: [] };

        case TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_START:
            return { ...state, detailLoading: true, analytics: [] };
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_SUCCESS:
            return { ...state, detailLoading: false, scheduleDetail: action.payload.scheduleDetail };
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_FAIL:
            return { ...state, detailLoading: false, analytics: [] };

        case TYPE.MANAGEMENT_COURTS_CREATE_START:
        case TYPE.MANAGEMENT_COURTS_UPDATE_START:
        case TYPE.MANAGEMENT_LOCATIONS_CREATE_START:
        case TYPE.MANAGEMENT_LOCATIONS_UPDATE_START:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_START:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_START:
            return { ...state, actionInProgress: true };

        case TYPE.MANAGEMENT_COURTS_DELETE_START:
            return { ...state, loading: true };

        case TYPE.MANAGEMENT_COURTS_CREATE_SUCCESS:
        case TYPE.MANAGEMENT_COURTS_UPDATE_SUCCESS:
        case TYPE.MANAGEMENT_LOCATIONS_CREATE_SUCCESS:
        case TYPE.MANAGEMENT_LOCATIONS_UPDATE_SUCCESS:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_SUCCESS:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_SUCCESS:
        case TYPE.MANAGEMENT_COURTS_CREATE_FAIL:
        case TYPE.MANAGEMENT_COURTS_UPDATE_FAIL:
        case TYPE.MANAGEMENT_LOCATIONS_CREATE_FAIL:
        case TYPE.MANAGEMENT_LOCATIONS_UPDATE_FAIL:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_FAIL:
        case TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_FAIL:
            return { ...state, actionInProgress: false, loading: false };

        case TYPE.MANAGEMENT_COURTS_DELETE_SUCCESS:
        case TYPE.MANAGEMENT_COURTS_DELETE_FAIL:
            return { ...state, loading: false };
        
        case TYPE.RESET_STATE:
            return { ...initialState };

        default:
            return state;
    }
}