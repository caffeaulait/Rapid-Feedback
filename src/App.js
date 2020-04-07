import React from 'react';
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Home from './components/Home/Home';

class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/home' component={Home}></Route>
        <Redirect from='/' to='/login'></Redirect>
      </Switch>
    );
    return routes;
  }
}

export default App;
