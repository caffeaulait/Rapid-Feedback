import React from 'react';
import { connect } from 'react-redux';
import Project from '../../../components/Project/Project';
import * as actions from '../../../store/actions/project';
import styles from './Projects.module.css';

class Projects extends React.Component {
  componentDidMount() {
    if (this.props.projects.length === 0) {
      console.log('fetching projects');
      this.props.fetchProjects();
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  goToCreate = () => {
    this.props.history.push(this.props.match.path + '/edit');
  };

  projectSelectedHandler = (pid) => {
    this.props.history.push(this.props.match.path + '/' + pid);
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }

    let projects = <p style={{ textAlign: 'center' }}>No projects Avaiable</p>;

    if (this.props.projects) {
      projects = this.props.projects.map((project) => {
        return (
          <Project
            key={project.id}
            project={project}
            clicked={() => this.projectSelectedHandler(project.id)}
          />
        );
      });
    }

    return (
      <div className={styles.outer}>
        <h1>My projects:</h1>
        <div className={styles.btnGroup}>
          <button
            className={'btn btn-danger ' + styles.back}
            onClick={this.goBack}
          >
            Back
          </button>
          <button
            className={'btn btn-primary ' + styles.create}
            onClick={this.goToCreate}
          >
            Create
          </button>
        </div>
        {projects}
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

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
