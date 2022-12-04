import * as TYPE from './types';

const initialState = {
    companies: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.COMMON_GET_COMPANIES_FAIL:
            return {...state, loading: true, companies: [] };
        case TYPE.COMMON_GET_COMPANIES_SUCCESS:
            return {...state, loading: false, companies: action.payload.companies };
        case TYPE.COMMON_GET_COMPANIES_FAIL:
            return {...state, loading: false, companies: [] };
        default:
            return state;
    }
}