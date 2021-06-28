import React, { useState } from 'react';

const Signup = () => {
  const [postData, setPostData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  return (
    <div className="signup-form-container">
      <form className="signup-form">
        <input type="text" name="name" id="name" placeholder="Name" onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPostData({ ...postData, password: e.target.value })}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => setPostData({ ...postData, confirmPassword: e.target.value })}
        />
      </form>
    </div>
  );
};

export default Signup;
