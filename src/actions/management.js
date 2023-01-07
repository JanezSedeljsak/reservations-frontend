import { toast } from 'react-toastify';
import * as TYPE from '../store/types';
import { getCourtDetail, getLocationDetail } from './common';
import { asFormData, apiRequest, getSaturdayOfNextWeek } from './helpers';

export const getManagementLocations = filters => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        let url = '/management/locations/';
        if (filters?.search) {
            url += `?search=${filters.search}`;
        }

        dispatch({ type: TYPE.MANAGEMENT_GET_LOCATIONS_START });
        apiRequest({
            url,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_LOCATIONS_SUCCESS,
                payload: { locations: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_LOCATIONS_FAIL });
        });
    }
}

export const createManagementLocation = ({ name, latitude, longitude, website_url, phone_number, email, city }, filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_START });
        apiRequest({
            url: '/management/locations/',
            body: asFormData({ name, latitude, longitude, website_url, city, phone_number, email, is_active: true }),
            method: 'POST',
            token: accessToken,
            okStatus: 201
        }).then((_) => {
            toast.success('Created new location!');
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_SUCCESS });
            dispatch(getManagementLocations(filters));
        }).catch((_) => {
            toast.error('Failed to create new location!');
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_CREATE_FAIL });
        });
    }
}

export const updateManagementLocation = ({ id, name, latitude, longitude, website_url, phone_number, email, city }, filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_START });
        apiRequest({
            url: `/management/locations/${id}/`,
            body: asFormData({ name, latitude, longitude, website_url, city, phone_number, email, is_active: true }),
            method: 'PATCH',
            token: accessToken,
        }).then((_) => {
            toast.success('Updated location!');
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_SUCCESS });
            dispatch(getManagementLocations(filters));
            dispatch(getLocationDetail(id));
        }).catch((_) => {
            toast.error('Failed to update location!');
            dispatch({ type: TYPE.MANAGEMENT_LOCATIONS_UPDATE_FAIL });
        });
    }
}

export const createManagementCourt = ({ name, court_types, is_outside, locationId }, filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_COURTS_CREATE_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/`,
            body: asFormData({ name, court_types, is_outside, is_active: true }),
            method: 'POST',
            token: accessToken,
            okStatus: 201
        }).then((_) => {
            toast.success('Created new location!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_CREATE_SUCCESS });
            dispatch(getLocationCourts({...filters, locationId }));
        }).catch((_) => {
            toast.error('Failed to create new location!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_CREATE_FAIL });
        });
    }
}

export const updateManagementCourt = ({ id, name, court_types, is_outside, locationId }, filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_COURTS_UPDATE_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/${id}/`,
            body: asFormData({ name, court_types, is_outside, is_active: true }),
            method: 'PATCH',
            token: accessToken,
        }).then((_) => {
            toast.success('Updated location!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_UPDATE_SUCCESS });
            dispatch(getLocationCourts({...filters, locationId }));
            dispatch(getCourtDetail(id));
        }).catch((_) => {
            toast.error('Failed to update location!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_UPDATE_FAIL });
        });
    }
}

export const deleteManagmentCourt = (id, locationId, callback) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_COURTS_DELETE_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/${id}/`,
            method: 'DELETE',
            token: accessToken,
            okStatus: 204,
        }).then((_) => {
            dispatch({ type: TYPE.MANAGEMENT_COURTS_DELETE_SUCCESS });
            toast.success('Deleted court!');
            callback();
        }).catch((_) => {
            toast.error('Failed to delete court!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_DELETE_FAIL });
        });
    }
}

export const getLocationCourts = (filters) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        let url = `/management/locations/${filters?.locationId}/courts/`;
        if (filters?.search) {
            url += `?search=${filters.search}`;
        }

        dispatch({ type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_START });
        apiRequest({
            url,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_SUCCESS,
                payload: { locationCourts: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_LOCATION_COURTS_FAIL });
        });
    }
}

export const getManagementSchedule = ({ location, court }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        const saturday = getSaturdayOfNextWeek();

        dispatch({ type: TYPE.MANAGEMENT_GET_SCHEDULE_START });
        apiRequest({
            url: `/schedules/?location=${location}&court=${court}`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_SCHEDULE_SUCCESS,
                payload: { timeline: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_SCHEDULE_FAIL });
        });
    }
};

export const createManagementSchedule = ({ locationId, courtId, day, start_time, end_time }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/${courtId}/schedules/`,
            body: asFormData({ day, start_time, end_time, price: 0.00, is_active: true }),
            method: 'POST',
            token: accessToken,
            okStatus: 201
        }).then((_) => {
            toast.success('Created new schedule!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_SUCCESS });
            dispatch(getManagementSchedule({
                location: locationId,
                court: courtId
            }));
        }).catch((_) => {
            toast.error('Failed to create new schedule!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_CREATE_FAIL });
        });
    }
}

export const updateManagementSchedule = ({ id, locationId, courtId, day, start_time, end_time }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/${courtId}/schedules/${id}/`,
            body: asFormData({ day, start_time, end_time, price: 0.00, is_active: true }),
            method: 'PATCH',
            token: accessToken
        }).then((_) => {
            toast.success('Updated schedule!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_SUCCESS });
            dispatch(getManagementSchedule({
                location: locationId,
                court: courtId
            }));
    
        }).catch((_) => {
            toast.error('Failed to update schedule!');
            dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_UPDATE_FAIL });
        });
    }
}

export const getManagementScheduleDetail = ({ locationId, courtId, id }) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;

        dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_START });
        apiRequest({
            url: `/management/locations/${locationId}/courts/${courtId}/schedules/${id}/`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            console.log(res);
            dispatch({
                type: TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_SUCCESS,
                payload: { scheduleDetail: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_COURTS_SCHEDULE_GET_FAIL });
        });
    }
};

export const getManagementAnalytics = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.MANAGEMENT_GET_ANALYTICS_START });
        apiRequest({
            url: `/management/analytics/?type=court_detail,location_detail`,
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({
                type: TYPE.MANAGEMENT_GET_ANALYTICS_SUCCESS,
                payload: { analytics: res ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.MANAGEMENT_GET_ANALYTICS_FAIL });
        });
    }
}