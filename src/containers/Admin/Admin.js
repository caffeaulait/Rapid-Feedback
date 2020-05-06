import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Projects from './Projects/Projects';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import ProjectEdit from './ProjectEdit/ProjectEdit';
import { connect } from 'react-redux';

class Admin extends React.Component {
  state = {};

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    let url = this.props.match.url;
    return (
      <>
        <Header></Header>
        <Switch>
          <Route path={url + '/projects/edit'} component={ProjectEdit}></Route>
          <Route
            path={url + '/projects/:pid'}
            component={ProjectDetail}
          ></Route>
          <Route path={url + '/projects'} component={Projects}></Route>
          <Redirect from={url} to={url + '/projects'}></Redirect>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(Admin);
