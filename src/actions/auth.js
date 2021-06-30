import axios from 'axios';
import APIUrls from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from './actionTypes';

export function startSignin() {
  return {
    type: LOGIN_START,
  };
}

export function signinFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function signinSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function signin({ email, password }) {
  console.log(email, password);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return async (dispatch) => {
    dispatch(startSignin());
    const url = APIUrls.signin();
    //Encode the format of the content type
    await axios
      .post(url, getFormBody({ email, password }), config)
      .then((res) => {
        const { data } = res;
        const { success, result, token, message } = data;
        if (success) {
          //save the user option
          localStorage.setItem('token', token);
          dispatch(signinSuccess(result));
          return;
        } else {
          dispatch(signinFailed(message));
        }
      })
      .catch((err) => {
        console.log(err.response)
        dispatch(signinFailed(err.response.data.message));
      });
  };
}
export function signup( email, password, confirmPassword, name ) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return async (dispatch) => {
    dispatch(startSignin());
    const url = APIUrls.signup();
    //Encode the format of the content type
    await axios
      .post(url, getFormBody({ email, password, confirmPassword, name }), config)
      .then((res) => {
        const { data } = res;
        const { success, result, token, message } = data;
        if (success) {
          //save the user option
          localStorage.setItem('token', token);
          dispatch(signupSuccess(result));
          return;
        } else {
          dispatch(signupFailed(message));
        }
      })
      .catch((err) => {
        dispatch(signupFailed(err.response.data.message));
      });
  };
}
