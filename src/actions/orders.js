import axios from 'axios';
import APIUrls from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
  CLEAR_ORDER_FORM_STATE,
  ORDER_FAILED,
  ORDER_START,
  ORDER_SUCCESS,
} from './actionTypes';

export function startOrderRequest() {
  return {
    type: ORDER_START,
  };
}

export function successOrderRequest(orderConfirmation) {
  return {
    type: ORDER_SUCCESS,
    orderConfirmation,
  };
}

export function failedOrderRequest(errorMessage) {
  return {
    type: ORDER_FAILED,
    error: errorMessage,
  };
}

export function clearOrderRequestState() {
  return {
    type: CLEAR_ORDER_FORM_STATE,
  };
}

export function confirmOrder(bookID, phoneNumber, address, pinCode, state) {
  const url = APIUrls.confirmOrder(bookID);
  const token = getAuthTokenFromLocalStorage();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  };
  const bodyParameters = {
    phoneNumber,
    address,
    pinCode,
    state,
  };

  return async (dispatch) => {
    try {
      await axios.post(url, getFormBody(bodyParameters), config).then((res) => {
        dispatch(startOrderRequest());
        const { message, results, success } = res.data;
        console.log(message, results, success);
        if (success) {
          dispatch(successOrderRequest(results.newOrder));
        } else {
          dispatch(failedOrderRequest(message));
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(failedOrderRequest(error.response.data.message));
    }
  };
}
