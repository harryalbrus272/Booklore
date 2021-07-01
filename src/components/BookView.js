import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { hideBookSearch, showBookSearch } from '../actions/books';
import APIUrls from '../helpers/urls';
import Order from './Order';

const BookView = (props) => {
  let bookID = props.match.params.id;
  //Destructuring the props
  const { auth, books, dispatch } = props;
  const [bookDetails, setBookDetails] = useState({});
  //Hiding the search bar in the navigation tab
  useEffect(() => {
    detailsBook(bookID);
    dispatch(hideBookSearch());
    return () => {
      dispatch(showBookSearch());
    };
  }, []);

  //fetching book details using the params
  const detailsBook = async (bookID) => {
    const url = APIUrls.detailsBook(bookID);
    try {
      await axios.get(url).then((res) => {
        const { data } = res;
        if (data.success) {
          setBookDetails(data.book);
        }
      });
    } catch (error) {}
  };
  return (
    <div>
      {bookDetails._id ? (
        <div className="book-info-container">
          <div className="image-container">
            <img height="150" src={bookDetails.url} alt="book" />
          </div>
          <div className="info-container">
            <h4 style={{ fontSize: '20px', margin: '0' }}>
              {bookDetails.title}
            </h4>
            <h6 style={{ fontSize: '15px', margin: '0' }}>
              {bookDetails.author}
            </h6>
            <p className="price">Rs. {bookDetails.price}</p>
          </div>
          <div className="description-container">
            <p>{bookDetails.description}</p>
          </div>
        </div>
      ) : (
        <h1 style={{ fontSize: '26' }}>Loading....</h1>
      )}

      <Order bookID={bookID} {...props} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    books: state.books,
    orders: state.orders,
  };
};
export default connect(mapStateToProps)(BookView);
