import axios from 'axios';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAIL } from './types'
import { returnErrors } from './errorActions';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // Dispatch user loading (which in the reducer sets loading state from false to true)
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
} 

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token

export const tokenConfig = getState => {

    // Get token from local storage. The function gets the auth state in the auth reducer and pulls the token state/key
    const token = getState().auth.token;
    
    // Add to Headers

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(token) {
        // If there's a token, set our token value to the x-auth-token key
        config.headers['x-auth-token'] = token;
    }
    return config;
};