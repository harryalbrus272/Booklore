import axios from 'axios';
import APIUrls from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_START,
  BOOK_SEARCH_SUCCESS,
} from './actionTypes';

export function fetchBookListStart() {
  return {
    type: BOOK_SEARCH_START,
  };
}

export function fetchBookListFailed(errorMessage) {
  return {
    type: BOOK_SEARCH_FAILED,
    error: errorMessage,
  };
}

export function fetchBookListSuccess(books) {
  return {
    type: BOOK_SEARCH_SUCCESS,
    books,
  };
}

export const fetchBooks = (text) => {
  const url = APIUrls.searchBook(text);

  return async (dispatch) => {
    try {
      if (text !== '') {
        dispatch(fetchBookListStart());
        await axios
          .get(url, {
            params: {
              text,
            },
          })
          .then((res) => {
            const { data = [], success, message } = res.data;
            if (success) {
              dispatch(fetchBookListSuccess(data));
              return;
            }
            dispatch(fetchBookListFailed(message));
          });
      } else {
        dispatch(fetchBookListSuccess([]));
      }
    } catch (error) {
      dispatch(fetchBookListFailed(error.response.data.message));
    }
  };
};
