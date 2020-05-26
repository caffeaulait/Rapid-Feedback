import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import StudentList from './StudentList';
import styles from './GroupAdd.module.css';

class GroupAdd extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    projectid: null,
    groid: 0,
    selectedStudents: [],
    students: [],
  };

  // }
  componentDidMount() {
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    const nextId = this.nextGroupId(this.props.students);
    const unGroupedStudents = this.props.students.filter(
      (el) => el.group_id === 0
    );
    this.setState({
      students: unGroupedStudents,
      groid: nextId,
      projectid: proid,
    });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  nextGroupId = (students) => {
    let maxId = 0;
    for (const student of students) {
      if (student.group_id > maxId) {
        maxId = student.group_id;
      }
    }
    return 1 + maxId;
  };

  clickStudentButton = (student) => {
    if (student.selected) {
      student.selected = false;

      let newSelected = this.state.selectedStudents.filter(
        (el) => el.id !== student.id
      );
      this.setState({ selectedStudents: newSelected });
    } else {
      student.selected = true;
      let newSelected = this.state.selectedStudents.concat(student);

      this.setState({ selectedStudents: newSelected });
    }
  };

  confirmGroupStudent = () => {
    const idList = [];
    for (let student of this.state.selectedStudents) {
      idList.push({ student_id: student.id });
    }
    this.props.confirmStudentGroup(
      this.state.projectid,
      this.state.groid,
      idList
    );
    this.goBack();
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    const selectStudents = this.state.selectedStudents.map((student) => {
      return (
        <span key={student.id} style={{ marginLeft: '1vh' }}>
          {student.first_name}&nbsp;{student.last_name},
        </span>
      );
    });

    let allAssigned = this.state.students.length === 0;
    let students = null;
    if (this.state.students.length > 0) {
      students = this.state.students.map((student) => {
        return (
          <StudentList
            key={student.id}
            student={student}
            delete={() => this.clickStudentButton(student)}
          />
        );
      });
    }

    let StudentTool = (
      <div className='studentToolContaner'>
        <h2>Group No. {this.state.groid}</h2>
        <div className={styles.btnGroup}>
          <button onClick={this.goBack} className='btn btn-danger'>
            Back
          </button>
        </div>
        <p style={{ textAlign: 'center' }}>
          All students have been assigned to groups
        </p>
      </div>
    );
    if (!allAssigned) {
      StudentTool = (
        <div className='studentToolContaner'>
          <h2>Group No. {this.state.groid}</h2>
          <div className={styles.btnGroup}>
            <button onClick={this.goBack} className='btn btn-danger'>
              Back
            </button>
            <button
              onClick={this.confirmGroupStudent}
              className='btn btn-primary'
            >
              confirm
            </button>
          </div>
          <div>
            <div>
              <b>Current Group Member: </b>
            </div>
            <div>{selectStudents}</div>
          </div>
          <table className={styles.gradeTable}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{students}</tbody>
          </table>
        </div>
      );
    }

    return <div style={{ margin: '5vh 20vh' }}>{StudentTool}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
    currentStudents: state.currentStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions.onFetchStudents(pid));
    },
    confirmStudentGroup: (pid, groupId, students) => {
      dispatch(actions.confirmStudentGroup(pid, groupId, students));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdd);
