import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_START,
  BOOK_SEARCH_SUCCESS,
  HIDE_BOOK_SEARCH,
  SHOW_BOOK_SEARCH,
} from '../actions/actionTypes';

const initialBookSearchState = {
  results: [],
  error: null,
  inProgress: false,
  disableSearch: false,
};

const books = (state = initialBookSearchState, action) => {
  switch (action.type) {
    case BOOK_SEARCH_START:
      return {
        ...state,
        inProgress: true,
      };
    case BOOK_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.books,
        inProgress: false,
      };
    case BOOK_SEARCH_FAILED:
      return {
        ...state,
        results: [],
        error: action.error,
        inProgress: false,
      };
    case HIDE_BOOK_SEARCH:
      return {
        ...initialBookSearchState,
        disableSearch: true,
      };
    case SHOW_BOOK_SEARCH:
      return {
        ...initialBookSearchState,
        disableSearch: false,
      };
    default:
      return state;
  }
};
export default books;
