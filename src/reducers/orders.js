import {
  CLEAR_ORDER_FORM_STATE,
  ORDER_FAILED,
  ORDER_START,
  ORDER_SUCCESS,
} from '../actions/actionTypes';

const initialOrderState = {
  results: {},
  error: null,
  inProgress: false,
  orderConfirmed: false,
  requestMade: false,
};
const orders = (state = initialOrderState, action) => {
  switch (action.type) {
    case ORDER_START:
      return {
        ...state,
        inProgress: true,
        requestMade: true,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        results: action.orderConfirmation,
        orderConfirmed: true,
      };
    case ORDER_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case CLEAR_ORDER_FORM_STATE:
      return {
        ...initialOrderState,
      };
    default:
      return state;
  }
};
export default orders;
