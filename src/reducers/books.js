import { BOOK_SEARCH_FAILED, BOOK_SEARCH_START, BOOK_SEARCH_SUCCESS } from '../actions/actionTypes';

const initialBookSearchState = {
  results: [],
  error: null,
  inProgress: false,
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
    default:
      return state;
  }
};
export default books;
