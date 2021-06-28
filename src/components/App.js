import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar, Home, Order, Signin, Signup, Page404, Cart } from './';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/order/:id">
          {(props) => <Order {...props} />}
        </Route>
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
