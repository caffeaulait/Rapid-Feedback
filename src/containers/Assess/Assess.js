import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Marking from './Marking/Marking';
import GroupMarking from './GroupMarking/GroupMarking';
import Projects from '../Admin/Projects/Projects';
import ProjDetail from './ProjDetail/ProjDetail';
import Select from './Select/Select';

class Assess extends React.Component {
  state = {};

  render() {
      // if (!this.props.isAuthenticated) {
      //   this.props.history.replace('/login');
      // }
    let url = this.props.match.url;
    return (
      <>
        <Header></Header>
        <Switch>
          {/* 4, marking a group or student, use path to differentiate*/}
          <Route
            path={url + '/projects/:pid/groups/:gid'}
            component={GroupMarking}
          ></Route>
          <Route
            path={url + '/projects/:pid/students/:sid'}
            component={Marking}
          ></Route>

          {/* 3, choose a student/group for assessment */}
          <Route path={url + '/projects/:pid/select'} component={Select}></Route>

          {/* 2,  see a project detail*/}
          <Route path={url + '/projects/:pid'} component={ProjDetail}></Route>

          {/* 1, list all projects */}
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

export default connect(mapStateToProps)(Assess);
