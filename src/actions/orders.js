import axios from 'axios';
import APIUrls from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
  CLEAR_ORDER_FORM_STATE,
  ORDER_FAILED,
  ORDER_START,
  ORDER_SUCCESS,
} from './actionTypes';

//Marking the start of the Order request
export function startOrderRequest() {
  return {
    type: ORDER_START,
  };
}


//Triggered when the Order request results in success
export function successOrderRequest(orderConfirmation) {
  return {
    type: ORDER_SUCCESS,
    orderConfirmation,
  };
}

//Triggered if the Order request results in a failure
export function failedOrderRequest(errorMessage) {
  return {
    type: ORDER_FAILED,
    error: errorMessage,
  };
}

//Clear State for the particular book and resuming another stage for a different book
export function clearOrderRequestState() {
  return {
    type: CLEAR_ORDER_FORM_STATE,
  };
}

//API call for the confirming the order
export function confirmOrder(bookID, phoneNumber, address, pinCode, state) {
  const url = APIUrls.confirmOrder(bookID);
  const token = getAuthTokenFromLocalStorage();
  //Config also contains the authorization header to authenticate the user
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
          return;
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
