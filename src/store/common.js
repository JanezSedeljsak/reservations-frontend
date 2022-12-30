import * as TYPE from './types';

const initialState = {
    companies: [],
    courtTypes: [],
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
            
        default:
            return state;
    }
}