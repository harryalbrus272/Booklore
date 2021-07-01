import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { fetchBooks } from '../actions/books';

const Navbar = (props) => {
  const { auth, books } = props;
  const handleSearch = (event) => {
    const searchText = event.target.value;
    props.dispatch(fetchBooks(searchText));
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    props.dispatch(logoutUser());
  };
  return (
    <div className="nav">
      <div className="">
        <Link to="/">
          <h1>Booklore</h1>
        </Link>
      </div>
      {!books.disableSearch && <div className="search">
        <input placeholder="Search"  onChange={(e) => handleSearch(e)} />
        {books.results.length > 0 && (
          <div className="search-results">
            <ul>
              {books.results.map((book) => (
                <Link to={`/book/${book._id}`}>
                  <li key={book._id} className="search-results-row">
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt="user-dp"
                    />
                    <span>{book.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>}
      <div className="menu">
        {!auth.isSignedIn ? (
          <ul className="horizontal-list">
            <Link to="/signin">
              <li>Sign In</li>
            </Link>
            <Link to="/signup">
              <li>Sign Up</li>
            </Link>
          </ul>
        ) : (
          <ul className="horizontal-list">
            <li>{auth.user.name}</li>
            <li>
              <button onClick={(e) => handleLogOut(e)}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    books: state.books,
  };
}
export default connect(mapStateToProps)(Navbar);
