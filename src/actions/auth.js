import axios from 'axios';
import APIUrls from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

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
        const {success, result, token, message} = data;
        if (success) {
          //save the user option
          localStorage.setItem('token', token);
          dispatch(signinSuccess(result));
          return;
        } else {
            dispatch(signinFailed(message)); 
        }
      })
      .catch((err) => console.log(err));
  };
}
