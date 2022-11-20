import { USER_LOGIN_SUCCESS, USER_LOGIN_START, USER_REGISTER_START, USER_REGISTER_SUCCESS, USER_LOGOUT } from '../store/types';

export const userLogin = ({ }) => {
    return (dispatch) => {
        dispatch({ type: USER_LOGIN_START });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { jwt: 'fake-jwt', user: { name: 'lorem ipsum' } } });
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT });
    }
}

export const userRegister = ({}) => {
    return (dispatch) => {
        dispatch({ type: USER_REGISTER_START });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: { jwt: 'fake-jwt', user: { name: 'lorem ipsum' } } });
    }
}