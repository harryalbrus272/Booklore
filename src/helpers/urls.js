//This contains all the URLs that are used for the api calls
const API_ROOT = 'https://booklogstore.herokuapp.com/api';
const APIUrls = {
  signin: () => `${API_ROOT}/users/signin`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchBooks: () => `${API_ROOT}/books`,
  searchBook: () => `${API_ROOT}/books/search`,
  detailsBook: (bookID) => `${API_ROOT}/books/details/${bookID}`,
  confirmOrder: (bookID) => `${API_ROOT}/orders/${bookID}`,
};
export default APIUrls;
