import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';

const Signin = (props) => {
  console.log(props);
  const { error, inProgress, isSignedIn } = props.auth;
  const { from } = props.location.state || { from: { pathname: '/' } };
  const [postData, setPostData] = useState({ email: '', password: '' });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (postData.email && postData.password) props.dispatch(signin(postData));
  };
  //redirecting user
  if (isSignedIn) {
    return <Redirect to={from} />;
  }
  return (
    <div className="signin-form-container">
      <form onSubmit={(e) => handleOnSubmit(e)} className="signin-form">
        {error && <div className="alert error-dailog">{error}</div>}
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
        {inProgress ? (
          <button type="submit" disabled={inProgress}>
            Signing in...
          </button>
        ) : (
          <button type="submit" disabled={inProgress}>
            Sign In
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
export default connect(mapStateToProps)(Signin);
