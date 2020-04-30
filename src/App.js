import React from 'react';
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Home from './components/Home/Home';
import Logout from './containers/Logout/Logout';

class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/logout' component={Logout}></Route>
        <Route path='/home' component={Home}></Route>
        <Redirect from='/' to='/login'></Redirect>
      </Switch>
    );
    return routes;
  }
}

export default App;

/*
routes:
1. /login   login to the app

2. /signup  signup to the app

3. /home    select one of the three modules

4. /admin                           N/A
      /projects                     list all projects
          /new                      add new project
          /:id                      project overview
              /edit                 edit project detail
              /groups               manage project groups
              /groups/add           add new groups 
              /students             manage project students
              /students/add         add new students
              /marker               manage project marker
              /criteria             set project criteria
              /criteriaWeight       set project criteria weights
              /criteriaConfirm      confirm project criteria

5. /assess                          N/A
      /projects                     list all projects for assessment
          /:id                      project overview
              /:groupId(studentId)  real-time assessment for group/student
                        
6. /review                          N/A
      /projects                     list all projects
          /:id                      N/A 
              /:groupId(studentId)  N/A
                  /grade            show the grade history for a student/group
                      /:id          show assessment detail
                          /edit     re-edit assessment
                  /report           upload audio and send reports
                  
*/
