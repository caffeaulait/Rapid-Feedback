import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Projects from './Projects/Projects';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import ProjectEdit from './ProjectEdit/ProjectEdit';
import Markers from './Markers/Markers';
import Criteria from './Criteria/Criteria';
import CriteriaConfirm from './CriteriaConfirm/CriteriaConfirm';
import Students from './Students/Students';
import AddStudent from './StudentAdd/StudentAdd';
import Groups from './Groups/Groups';
import { connect } from 'react-redux';
import GroupAdd from './GroupAdd/GroupAdd';

class Admin extends React.Component {
  state = {};

  render() {
    console.log(this.props.isCoordinator);
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    let url = this.props.match.url;
    return (
      <>
        <Header isCoordinator={this.props.isCoordinator}></Header>
        <Switch>
          <Route
            path={url + '/projects/:pid/students'}
            exact
            component={Students}
          ></Route>
          <Route
            path={url + '/projects/:pid/students/add'}
            component={AddStudent}
          ></Route>
          <Route
            path={url + '/projects/:pid/groups'}
            exact
            component={Groups}
          ></Route>
          <Route
            path={url + '/projects/:pid/groups/add'}
            component={GroupAdd}
          ></Route>
          <Route
            path={url + '/projects/:pid/criteriaConfirm'}
            component={CriteriaConfirm}
          ></Route>
          <Route
            path={url + '/projects/:pid/criteria'}
            component={Criteria}
          ></Route>
          <Route
            path={url + '/projects/:pid/markers'}
            component={Markers}
          ></Route>
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
    isCoordinator: state.auth.isCoordinator,
  };
};

export default connect(mapStateToProps, null)(Admin);
