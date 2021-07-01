import axios from 'axios';
import APIUrls from '../helpers/urls';
import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_START,
  BOOK_SEARCH_SUCCESS,
  HIDE_BOOK_SEARCH,
  SHOW_BOOK_SEARCH,
} from './actionTypes';


//Starting to fetch the books list
export function fetchBookListStart() {
  return {
    type: BOOK_SEARCH_START,
  };
}

//Triggered if the book search fails
export function fetchBookListFailed(errorMessage) {
  return {
    type: BOOK_SEARCH_FAILED,
    error: errorMessage,
  };
}

//Hiding the book search when the user redirects to the book details page
export function hideBookSearch() {
  return {
    type: HIDE_BOOK_SEARCH,
  };
}

//Showing the book search when the user redirects to the book details page
export function showBookSearch() {
  return {
    type: SHOW_BOOK_SEARCH,
  };
}

//Triggered if the book search is succesful
export function fetchBookListSuccess(books) {
  return {
    type: BOOK_SEARCH_SUCCESS,
    books,
  };
}

//API calls to fetch the books using the text
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
