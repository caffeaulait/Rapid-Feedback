import React from 'react';
import styles from './Grades.module.css';
import StudenTab from '../../../components/StudentTab/StudentTab';
import Grade from '../../../components/Grade/Grade';
import { connect } from 'react-redux';
import * as result from '../../../store/actions/result';

class Grades extends React.Component {
  state = {
    hasVoice: false,
    student: null,
    grades: [],
  };

  // const data = {
  //   uni_student_number: parseInt(stateData.stuNo),
  //   first_name: stateData.firstName,
  //   last_name: stateData.lastName,
  //   uni_email: stateData.email,
  //   project_id: pid,
  // };

  componentDidMount() {
    const projectId = this.props.match.params.pid;
    const studentId = this.props.match.params.sid;
    const groupId = this.props.match.params.gid;
    // eslint-disable-next-line eqeqeq
    const student = this.props.students.find((el) => el.id == studentId);
    if (student) {
      this.props.fetchGrades(projectId, studentId);
    }
    this.setState({ student: student });
  }

  toViewAssessment = () => {};

  render() {
    const grades = [
      {
        id: 1,
        grade: 16.0,
        marker: 'Tutor A',
        date: '9 Apr 2020',
      },
      {
        id: 2,
        grade: 17.0,
        marker: 'Tutor B',
        date: '10 Apr 2020',
      },
      {
        id: 3,
        grade: 15.0,
        marker: 'Tutor C',
        date: '11 Apr 2020',
      },
    ];

    let tab = <StudenTab hasVoice={this.state.hasVoice}></StudenTab>;

    const gradeRow = grades.map((el) => (
      <Grade
        key={el.id}
        index={el.id}
        grade={el.grade}
        marker={el.marker}
        date={el.date}
      ></Grade>
    ));

    return (
      <div className={styles.outer}>
        <div className={styles.left}>{tab}</div>
        <div className={styles.right}>
          <p> Below are marks for this student: </p>
          <table className={styles.gradeTable}>
            <thead>
              <tr>
                <th> </th>
                <th>Grade</th>
                <th>Marker</th>
                <th>Date</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{gradeRow}</tbody>
          </table>

          <div className={styles.btnGroup}>
            <button className={'btn btn-danger ' + styles.controlBtn}>
              Back
            </button>
            <button className={'btn btn-primary ' + styles.controlBtn}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
    // projectid:state.projectid
    // projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGrades: (pid, tid) => {
      dispatch(result.onFetchAllResult(pid, tid));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Grades);
