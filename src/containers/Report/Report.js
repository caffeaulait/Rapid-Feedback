import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Grades from './Grades/Grades';

class Report extends React.Component {
  render() {
    const url = this.props.match.url;

    return (
      <>
        <Header></Header>
        <Switch>
          <Route
            path={url + '/projects/:pid/:id/grade'}
            component={Grades}
          ></Route>
        </Switch>
      </>
    );
  }
}

export default Report;
