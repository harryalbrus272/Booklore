import React from 'react';
import { useState } from 'react';

const Signin = () => {
  const [postData, setPostData] = useState({ email: '', password: '' });
  return (
    <div className="signin-form-container">
      <form className="signin-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) =>
            setPostData({ ...postData, password: e.target.value })
          }
        />
      </form>
    </div>
  );
};

export default Signin;
