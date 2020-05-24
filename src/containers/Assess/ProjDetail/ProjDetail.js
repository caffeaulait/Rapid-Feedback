/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/project';
import styles from './ProjDetail.module.css';
import * as format from '../../../util/date';

class ProjDetail extends React.Component {
  state = {
    project: null,
    id: null,
  };

  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.setState({ id: pid });
    const foundProj = this.props.projects.find((el) => el.id == pid);
    // console.log(foundProj);
    this.setState({ project: foundProj });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  select = () => {
    this.props.history.push(`/assess/projects/${this.state.id}/select`);
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    let fullProj = <p>Fail to load project details</p>;
    const groupBtn = (
      <button className='btn btn-outline-primary' onClick={this.select}>
        Select Groups >
      </button>
    );

    const studentBtn = (
      <button className='btn btn-outline-primary' onClick={this.select}>
        Select Students >
      </button>
    );
    if (this.state.project) {
      const date = new Date(this.state.project.due_date);
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
            <div className={styles.boxTop}>
              <h2>
                Posted by: {this.state.project.subject_code}{' '}
                {this.state.project.subject_name}
              </h2>
            </div>
            {/* <h3>Due: 31 Mar 2020</h3> */}
            <h3>
              Due: {day} {month} {year}
            </h3>
            <p>{this.state.project.proj_description}</p>

            <div className={styles.btnGroup}>
              {this.state.project.is_group == 1 ? groupBtn : studentBtn}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjDetail);
