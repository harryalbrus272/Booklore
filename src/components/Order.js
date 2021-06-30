import React, { useState } from 'react';
import { useEffect } from 'react';
import { clearOrderRequestState, confirmOrder } from '../actions/orders';

const Order = (props) => {
  console.log('props in Order', props);
  const { dispatch, bookID, orders } = props;
  const [postData, setPostData] = useState({
    phoneNumber: '',
    address: '',
    pinCode: '',
    state: '',
  });

  useEffect(() => {
    return () => {
      dispatch(clearOrderRequestState());
    }
  }, [])
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (
      bookID &&
      postData.phoneNumber &&
      postData.address &&
      postData.pinCode &&
      postData.state
    )
      dispatch(
        confirmOrder(
          bookID,
          postData.phoneNumber,
          postData.address,
          postData.pinCode,
          postData.state
        )
      );
  };
  return (
    <div>
      {orders.requestMade && orders.results._id && <div className="alert success-dailog"><h1>Order Confirmed - {orders.results._id} </h1></div>}
      {orders.requestMade && !orders.results._id && <div className="alert error-dailog"><h1>Order Dismissed - {orders.error} </h1></div>}
      {!orders.requestMade && <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        className="contact-form"
      >
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          required
          onChange={(e) =>
            setPostData({ ...postData, phoneNumber: e.target.value })
          }
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          required
          onChange={(e) =>
            setPostData({ ...postData, address: e.target.value })
          }
        />
        <input
          type="number"
          name="pinCode"
          id="pinCode"
          placeholder="Pin Code"
          required
          onChange={(e) =>
            setPostData({ ...postData, pinCode: e.target.value })
          }
        />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="state"
          required
          onChange={(e) => setPostData({ ...postData, state: e.target.value })}
        />
        <button type="submit">Order Now!</button>
      </form>}
    </div>
  );
};

export default Order;
