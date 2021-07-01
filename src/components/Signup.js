import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthState, signup, startSignup } from '../actions/auth';

const Signup = (props) => {
  const { error, inProgress, isSignedIn } = props.auth;
  const { from } = props.location.state || { from: { pathname: '/' } };
  const [postData, setPostData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  useEffect(() => {
    return () => {
      props.dispatch(clearAuthState());
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      postData.email &&
      postData.confirmPassword &&
      postData.name &&
      postData.password
    ) {
      props.dispatch(startSignup());
      props.dispatch(
        signup(
          postData.email,
          postData.password,
          postData.confirmPassword,
          postData.name
        )
      );
    }
  };
  //redirecting user
  if (isSignedIn) {
    return <Redirect to={from} />;
  }
  return (
    <div className="signup-form-container">
      <form onSubmit={(e) => handleFormSubmit(e)} className="signup-form">
        {error && <div className="alert error-dailog">{error}</div>}
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
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
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) =>
            setPostData({ ...postData, confirmPassword: e.target.value })
          }
        />
        {inProgress ? (
          <button type="submit" disabled={inProgress}>
            Signing Up
          </button>
        ) : (
          <button type="submit" disabled={inProgress}>
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Signup);
