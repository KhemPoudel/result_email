import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from "./component/signup";
import Login from "./component/login";
import Dashboard from './component/home';
import PrivateRoute from './component/privateRoute';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
