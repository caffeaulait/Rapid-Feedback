/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/project';
import styles from './ProjectDetail.module.css';
import * as format from '../../../util/date';

class ProjectDetail extends React.Component {
  state = {
    project: null,
    id: null,
  };

  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.setState({ id: pid });
    const foundProj = this.props.projects.find((el) => el.id == pid);
    console.log(foundProj);
    this.setState({ project: foundProj });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  editProject = () => {
    this.props.history.push('/admin/projects/edit?id=' + this.state.id);
  };

  deleteProject = () => {
    let choice = confirm('Sure to delete this project?');
    if (choice) {
      this.props.deleteProject(this.state.id);
      this.goBack();
    }
  };

  addMarker = () => {};

  setCriteria = () => {};

  seeGroups = () => {};

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    let fullProj = <p>Fail to load project details</p>;
    if (this.state.project) {
      const date = this.state.project.date;
      const year = date.getFullYear();
      const month = format.months[date.getMonth()];
      const day = date.getDate();
      fullProj = (
        <div className={styles.outer}>
          <div className={styles.top}>
            <h1>{this.state.project.proj_name}</h1>
            <button className='btn btn-outline-primary' onClick={this.goBack}>
              Back to My projects >
            </button>
          </div>
          <div className={styles.box}>
            <h2>
              Posted by: {this.state.project.subject_code}{' '}
              {this.state.project.subject_name}
            </h2>
            {/* <h3>Due: 31 Mar 2020</h3> */}
            <h3>
              Due: {day} {month} {year}
            </h3>
            <p>{this.state.project.proj_description}</p>

            <div className={styles.btnGroup}>
              <button className='btn btn-primary' onClick={this.editProject}>
                Edit
              </button>
              <button className='btn btn-danger' onClick={this.deleteProject}>
                Delete
              </button>
              <button className='btn btn-outline-dark' onClick={this.addMarker}>
                Add Marker
              </button>
              <button
                className='btn btn-outline-info'
                onClick={this.setCriteria}
              >
                Set Criteria
              </button>
              <button
                className='btn btn-outline-primary'
                onClick={this.seeGroups}
              >
                See Groups >
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <> {fullProj} </>;
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
    deleteProject: (id) => {
      dispatch(actions.onDeleteProject(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
