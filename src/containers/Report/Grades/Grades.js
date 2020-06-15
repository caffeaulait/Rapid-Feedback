/* eslint-disable eqeqeq */
import React from 'react';
import styles from './Grades.module.css';
import StudenTab from '../../../components/StudentTab/StudentTab';
import GroupTab from '../../../components/GroupTab/GroupTab';
import Grade from '../../../components/Grade/Grade';
import { connect } from 'react-redux';
import * as result from '../../../store/actions/result';

class Grades extends React.Component {
  state = {
    hasVoice: false,
    student: null,
    // grades: [],
    project: null,
    students: [],
    isGroup: false,
  };

  componentDidMount() {
    const projectId = this.props.match.params.pid;
    const studentId = this.props.match.params.sid;
    const groupId = this.props.match.params.gid;
    const project = this.props.projects.find((el) => el.id == projectId);
    const isGroup = project ? project.is_group : false;
    const student = this.props.students.find((el) => el.id == studentId);
    const students = this.props.students.filter((el) => el.group_id == groupId);
    if (!isGroup && student) {
      this.props.fetchGrades(projectId, studentId);
    } else if (isGroup && students.length > 0) {
      this.props.fetchGrades(projectId, students[0].id);
    }
    this.setState({
      student: student,
      project: project,
      students: students,
      isGroup: isGroup,
    });
  }

  toViewAssessment = () => {};

  computeRow = (assessment) => {
    let grade = 0;
    let fullMark = 0;
    let date = new Date();
    let marker = null;
    for (let el of assessment) {
      grade += el.score;
      fullMark += el.fullMark;
      date = new Date(el.assessedDate);
      marker = el.firstName + ' ' + el.lastName;
    }
    return {
      grade,
      marker,
      date,
      fullMark,
    };
  };

  goBack = () => {
    this.props.history.goBack();
  };

  continue = () => {
    let url = this.props.match.url;
    this.props.history.push(url + '/review');
  };

  render() {
    // const grades = [
    //   {
    //     id: 1,
    //     grade: 16.0,
    //     marker: 'Tutor A',
    //     date: '9 Apr 2020',
    //   },
    //   {
    //     id: 2,
    //     grade: 17.0,
    //     marker: 'Tutor B',
    //     date: '10 Apr 2020',
    //   },
    //   {
    //     id: 3,
    //     grade: 15.0,
    //     marker: 'Tutor C',
    //     date: '11 Apr 2020',
    //   },
    // ];

    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    let grades = [];
    for (let obj of this.props.results) {
      grades.push(this.computeRow(obj.results));
    }
    let tab = null;

    if (this.state.student) {
      tab = (
        <StudenTab
          hasVoice={this.state.hasVoice}
          project={this.state.project}
          student={this.state.student}
        ></StudenTab>
      );
    }
    if (this.state.isGroup && this.state.students.length > 0) {
      tab = (
        <GroupTab
          students={this.state.students}
          project={this.state.project}
          hasVoice={this.state.hasVoice}
        ></GroupTab>
      );
    }

    const gradeRow = grades.map((el, index) => (
      <Grade
        key={index}
        index={index + 1}
        grade={el.grade}
        fullMark={el.fullMark}
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
            <button
              className={'btn btn-danger ' + styles.controlBtn}
              onClick={this.goBack}
            >
              Back
            </button>
            <button
              className={'btn btn-primary ' + styles.controlBtn}
              onClick={this.continue}
            >
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
    projects: state.proj.projects,
    results: state.result.allResults,
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
