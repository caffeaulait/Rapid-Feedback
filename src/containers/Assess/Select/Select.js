/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import GroupCard from './GroupCard';
import StudentCard from './StudentCard';
import styles from './Select.module.css';

class Select extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    project: null,
    projectid: null,
  };

  // }
  componentDidMount() {
    const proid = parseInt(this.props.match.params.pid);
    const foundProj = this.props.projects.find((el) => el.id === proid);
    this.setState({ project: foundProj, projectid: proid });
    console.log('fetching students');
    this.props.fetchStudents(proid);
  }

  groupBy = (xs, key) => {
    let obj = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
    const results = [];
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        results.push({ group_id: k, students: obj[k] });
      }
    }
    return results.sort((a, b) => a.group_id < b.group_id);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goStuAssess = (sid) => {
    this.props.history.push(
      `/assess/projects/${this.state.projectid}/students/` + sid
    );
  };

  goGroAssess = (gid) => {
    this.props.history.push(
      `/assess/projects/${this.state.projectid}/groups/` + gid
    );
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    let students = <p style={{ textAlign: 'center' }}>Student</p>;

    let studentGroups = [];
    const groupedStudents = this.props.students.filter(
      (student) => student.group_id !== 0
    );
    // eslint-disable-next-line no-unused-vars
    const unGroupedStudents = this.props.students.filter(
      (student) => student.group_id === 0
    );

    studentGroups = this.groupBy(groupedStudents, 'group_id');

    console.log(this.props.students);
    if (this.props.students) {
      students = this.props.students.map((student) => {
        return (
          <StudentCard
            key={student.id}
            student={student}
            assess={() => this.goStuAssess(student.id)}
          />
        );
      });
    }

    let groups = null;
    groups = studentGroups.map((el) => {
      return (
        <GroupCard
          students={el.students}
          groupid={el.group_id}
          key={el.group_id}
          assess={() => this.goGroAssess(el.group_id)}
        ></GroupCard>
      );
    });

    let StudentTool = (
      <p style={{ textAlign: 'center', marginTop: '10vh' }}>
        No students available
      </p>
    );
    if (this.props.students.length !== 0) {
      StudentTool = (
        <div className={styles.container}>
          <div className={styles.top}>
            <h1
              style={{
                fontSize: '40px',
                color: '#003f8a',
                fontWeight: 'bold',
                marginRight: '20vh',
              }}
            >
              Student List
            </h1>
            <button
              className={'btn btn-danger ' + styles.back}
              onClick={this.goBack}
            >
              Back
            </button>
          </div>
          <div className={styles.bottom}>
            <table className={styles.gradeTable}>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{students}</tbody>
            </table>
          </div>
        </div>
      );
    }

    let GroupTool = (
      <p style={{ textAlign: 'center', marginTop: '10vh' }}>
        No groups available
      </p>
    );

    if (studentGroups.length !== 0) {
      GroupTool = (
        // return (
        <div className={styles.outer}>
          <div
            style={{
              display: 'flex',
              marginBottom: '5vh',
              justifyContent: 'space-between',
            }}
          >
            <h1
              style={{
                fontSize: '40px',
                color: '#003f8a',
                fontWeight: 'bold',
                marginRight: '20vh',
              }}
            >
              Group List
            </h1>
            <button
              className={'btn btn-danger ' + styles.back}
              onClick={this.goBack}
            >
              Back
            </button>
          </div>
          {groups}
        </div>
      );
    }

    let list = <p>Failed to load project information</p>;
    if (this.state.project) {
      list = (
        <div>{this.state.project.is_group === 1 ? GroupTool : StudentTool}</div>
      );
    }

    return <div>{list}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
    projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions.onFetchStudents(pid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
