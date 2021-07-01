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

//Starting the Signing in Process
export function startSignin() {
  return {
    type: LOGIN_START,
  };
}

//triggered if the signing in fails
export function signinFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

//If the signing in is successful
export function signinSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

//Starting the Signing up Process
export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

//triggered if the signing up fails
export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

//If the signing up is successful
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

//Action to log out the user
export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

//Clearing auth state to remove the errors and messages already in the state
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

//Authenticating the user 
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

//Action for sending request to the sever to confirm sign in 
export function signin({ email, password }) {;
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
          //save the user option to the localStorage
          localStorage.setItem('token', token);
          //Dispatching the relevant actions
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

//Action for Api calls to authenticate the signing up process
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
          //save the user option to the localStorage of the user
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
