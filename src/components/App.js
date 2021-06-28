import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar, Home, Order, Signin, Signup, Page404 } from './';
function App() {
  let password = 'something';
  let email = 'shashwatksingh.27@gmail.com';
  function getFormBody(params) {
    console.log(params);
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);

      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  useEffect(() => {
    fetch('http://localhost:3000/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/order/:id">
          {(props) => <Order {...props} />}
        </Route>
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
