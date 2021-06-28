const API_ROOT = 'http://localhost:3000/api';
const APIUrls = {
  signin: () => `${API_ROOT}/users/signin`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchBooks: () => `${API_ROOT}/books`,
  searchBook: (bookName) => `${API_ROOT}/api/books/search?text=${bookName}>`,
};
export default APIUrls;
