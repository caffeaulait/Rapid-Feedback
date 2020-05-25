import React from 'react';
import { connect } from 'react-redux';
import Project from '../../../components/Project/Project';
import * as actions from '../../../store/actions/project';
import styles from './Projects.module.css';
import SearchField from 'react-search-field';

class Projects extends React.Component {
  state = {
    query: '',
  };

  componentDidMount() {
    if (this.props.projects.length === 0) {
      console.log('fetching projects');
      this.props.fetchProjects();
      console.log(this.props.match.path);
    }
  }

  searchHandler = (value, event) => {
    this.setState({ query: value.toLowerCase() });
  };

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

    if (this.props.projects.length !== 0) {
      let projs = [...this.props.projects];
      if (this.state.query !== '') {
        projs = this.props.projects.filter(
          (el) =>
            el.subject_code.toLowerCase().startsWith(this.state.query) ||
            el.subject_name.toLowerCase().startsWith(this.state.query) ||
            el.proj_name.toLowerCase().startsWith(this.state.query)
        );
      }
      // console.log(this.props.projects);
      projects = projs.map((project) => {
        return (
          <Project
            key={project.id}
            project={project}
            clicked={() => this.projectSelectedHandler(project.id)}
          />
        );
      });
    }
    let createBtn = null;
    if (this.props.match.path !== '/assess/projects') {
      createBtn = (
        <button
          className={'btn btn-primary ' + styles.create}
          onClick={this.goToCreate}
        >
          Create
        </button>
      );
    }

    return (
      <div className={styles.outer}>
        <div className={styles.top}>
          <h1>My projects:</h1>
          <SearchField
            onChange={(value, event) => this.searchHandler(value, event)}
            placeholder='search...'
            classNames={styles.search}
          ></SearchField>
        </div>
        <div className={styles.btnGroup}>
          <button
            className={'btn btn-danger ' + styles.back}
            onClick={this.goBack}
          >
            Back
          </button>
          {createBtn}
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
