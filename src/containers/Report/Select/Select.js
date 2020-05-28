/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';
// import { ListGroup } from 'react-bootstrap';
import StudentAndGroup from './StudentAndGroup';
import styles from './Select.module.css';
import * as actions from '../../../store/actions/project';

class Select extends React.Component {
  state = {};

  componentDidMount() {
    this.url = this.props.match.url;
    console.log('fetching projects');
    this.props.fetchProjects();
  }

  goBack = () => {
    this.props.history.push('/home');
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    let projectTab = (
      <>
        <p>No projects Available</p>
      </>
    );
    if (this.props.projects && this.props.projects.length > 0) {
      //   const proId = this.props.match.params.pid;
      let headDesc = null;

      //   if (proId) {
      //     let selected = this.props.projects.find((el) => el.id == proId);
      //     headDesc = (
      //       <div>
      //         {selected.subject_code}
      //         {selected.subject_name}
      //       </div>
      //     );
      //   }
      projectTab = (
        <>
          <h2 style={{ marginBottom: '10vh' }}>Current Project: </h2>
          {headDesc}
          <div className={styles.projTab}>
            <ul className='nav flex-column'>
              {this.props.projects.map((project) => (
                <li className='nav-item' key={project.id}>
                  <NavLink
                    className='nav-link link'
                    activeStyle={{
                      color: '#003f8a',
                      textDecoration: 'underline solid #003f8a',
                    }}
                    style={{ color: 'black' }}
                    to={this.url + '/' + project.id}
                  >
                    <div className={styles.proj}>
                      {project.subject_code} {project.subject_name}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }

    return (
      <div className={styles.outer}>
        <div className={styles.left}>
          {projectTab}
          <button
            className={'btn btn-danger ' + styles.backBtn}
            onClick={this.goBack}
          >
            Back
          </button>
        </div>
        <div className={styles.right}>
          <Switch>
            <Route
              path={this.url + '/:pid'}
              render={(props) => (
                <StudentAndGroup key={Date.now()} {...props} />
              )}
            ></Route>
            <Route path={this.url}>
              <div>
                <b>Please select a project on the left</b>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => {
      dispatch(actions.onFetchProjects());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Select);
