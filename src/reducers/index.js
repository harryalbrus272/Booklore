import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';
import orders from './orders';
export default combineReducers({
  auth,
  books,
  orders
});