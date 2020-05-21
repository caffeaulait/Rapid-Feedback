import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grades from './Grades/Grades';
import SendReport from './SendReport/SendReport';
import Review from './Review/Review';

class Report extends React.Component {
  render() {
    const url = this.props.match.url;

    return (
      <>
        <Header></Header>
        <Switch>
          {/* 5. send pdf page */}
          <Route
            path={url + '/projects/:pid/groups/:gid/report'}
            component={SendReport}
          ></Route>
          <Route
            path={url + '/projects/:pid/students/:sid/report'}
            component={SendReport}
          ></Route>

          {/* 4. review assessment, can adjust marks and comments */}
          <Route
            path={url + '/projects/:pid/groups/:gid/review'}
            component={Review}
          ></Route>
          <Route
            path={url + '/projects/:pid/students/:sid/review'}
            component={Review}
          ></Route>

          {/* 3. see marking histroy of a group or student */}
          <Route
            path={url + '/projects/:pid/groups/:gid'}
            component={Grades}
          ></Route>
          <Route
            path={url + '/projects/:pid/students/:sid'}
            component={Grades}
          ></Route>

          {/* 2. see students/groups, choose one for review*/}
          <Route path={url + '/projects/:pid'}></Route>
          {/* 1. see project lists, choose project */}
          <Route path={url + '/projects'}></Route>

          <Redirect from={url} to={url + '/projects'}></Redirect>
        </Switch>
      </>
    );
  }
}

export default Report;
