import React, { useState } from 'react';

const Order = () => {
  const [postData, setPostData] = useState({ phoneNumber: '', address: '', pinCode: '', state: '' });
  return (
    <div>
      <form className="contact-form">
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          onChange={(e) => setPostData({ ...postData, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
        />
        <input
          type="number"
          name="pinCode"
          id="pinCode"
          placeholder="Pin Code"
          onChange={(e) =>
            setPostData({ ...postData, pinCode: e.target.value })
          }
        />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="State"
          onChange={(e) =>
            setPostData({ ...postData, state: e.target.value })
          }
        />
        <button type="submit">Order Now!</button>
      </form>
    </div>
  );
};

export default Order;
