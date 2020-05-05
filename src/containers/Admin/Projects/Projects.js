import React from 'react';
import { connect } from 'react-redux';
import Project from '../../../components/Project/Project';
import * as actions from '../../../store/actions/project';
import styles from './Projects.module.css';

class Projects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  projectSelectedHandler = (id) => {
    this.props.history.push(this.props.match.path + '/' + id);
  };

  render() {
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
      <div>
        <div>My projects:</div>
        <button className='btn btn-danger'>Back</button>
        <button className='btn btn-primary'>Create</button>
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
