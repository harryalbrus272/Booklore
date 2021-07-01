import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { Navbar, Home, Signin, Signup, Page404, Cart, Bookview } from './';
function App(props) {
  const { auth } = props;
  //Checking if the user is authenticated on opening the application
  useEffect(() => {
    const token = getAuthTokenFromLocalStorage();
    console.log(token);
    if (token) {
      const user = jwtDecode(token);
      console.log('user', user);
      props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user.id,
          name: user.name,
        })
      );
    }
  }, []);

  //Private Route can be accessed only if the user is signed in
  const PrivateRoute = (privateRouteProps) => {
    const { isSignedIn, path, component: Component } = privateRouteProps;
    return (
      <Route
        path={path}
        render={(props) => {
          return isSignedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/book/:id" component={Bookview} />
          <PrivateRoute
            path="/cart"
            component={Cart}
            isSignedIn={props.auth.isSignedIn}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
