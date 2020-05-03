import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Projects from './Projects/Projects';

class Admin extends React.Component {
  render() {
    let url = this.props.match.url;
    return (
      <>
        <Header></Header>
        <p>This is admin page</p>
        <Switch>
          <Route path={url + '/projects'} component={Projects}></Route>
        </Switch>
      </>
    );
  }
}

export default Admin;
