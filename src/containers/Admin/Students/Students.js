/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import StudentCard from '../../../components/StudentCard/StudentCard';
import styles from './Students.module.css';
import XLSX from 'xlsx';
import Papa from 'papaparse';
import address from '../../../store/api';
import { withRouter } from 'react-router-dom';
// import Template from '../../../components/Modal/Template';

class Students extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    projectid: null,
    fileName: 'No files currently selected for upload',
    show: false,
    isGroup: false,
  };

  // }
  componentDidMount() {
    // console.log(this.props.match.params);
    let isGroup = false;
    if (this.props.isGroup === 'true') {
      isGroup = true;
    }
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid, isGroup: isGroup });
    console.log('fetching students');
    this.props.fetchStudents(proid);
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goToAdd = () => {
    this.props.history.push(
      `/admin/projects/${this.state.projectid}/students/add`
    );
  };

  delStudent = (pid, sid) => {
    this.props.deleteStudent(pid, sid);
  };

  importData = (event) => {
    const files = event.target.files;
    if (files.length === 0) {
      //do nothing
    } else {
      const file = files[0];
      const type = file.name.split('.').pop();
      this.setState({ fileName: file.name });
      if (type === 'csv') {
        this.readCSV(file);
      } else if (type === 'xlsx') {
        this.readExcel(file);
      }
    }
  };

  readCSV = (file) => {
    var that = this;
    Papa.parse(file, {
      complete: function (results) {
        const data = results.data;
        const students = data.slice(1).map((student) => {
          return {
            number: student[0],
            firstName: student[1],
            lastName: student[2],
            email: student[3],
          };
        });
        that.props.importStudents(that.state.projectid, students);
      },
    });
  };

  readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binary = e.target.result;
      const workbook = XLSX.read(binary, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let students = XLSX.utils.sheet_to_json(worksheet);
      students = students.map((student) => {
        return {
          number: student['Student Number'],
          firstName: student['First Name'],
          lastName: student['Last Name'],
          email: student['Email'],
        };
      });
      this.props.importStudents(this.state.projectid, students);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
    reader.readAsBinaryString(file);
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }

    const link = `${address}/students/template`;

    let students = null;

    console.log(this.props.students);
    if (this.props.students) {
      students = this.props.students.map((student, key) => {
        return (
          <StudentCard
            key={key}
            student={student}
            delete={() => this.delStudent(this.state.projectid, student.id)}
            isGroup={this.state.isGroup}
          />
        );
      });
    }

    let group = null;
    if (this.state.isGroup) {
      group = <th>Group No.</th>;
    }

    let studentList = (
      <p style={{ textAlign: 'center', marginTop: '10vh' }}>
        No students available
      </p>
    );
    if (this.props.students.length !== 0) {
      studentList = (
        <table className={styles.gradeTable}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email</th>
              {group}
              <th> </th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      );
    }

    const StudentTool = (
      <div className='studentToolContaner'>
        <h1 style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold' }}>
          Student List
        </h1>
        <div className={styles.btnGroup}>
          <button
            className={'btn btn-danger ' + styles.back}
            onClick={this.goBack}
          >
            Back
          </button>
          <button
            className={'btn btn-primary ' + styles.add}
            onClick={this.goToAdd}
          >
            Add
          </button>
          <button
            className={'btn btn-info ' + styles.import}
            onClick={() => {
              this.fileInput.click();
            }}
          >
            Import
          </button>
          <div>
            <p>
              <small>{this.state.fileName}</small>
            </p>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={(input) => (this.fileInput = input)}
              onChange={(event) => {
                this.importData(event);
              }}
              accept='.csv, .xlsx'
            />
            <a href={link} download='template.xlsx'>
              <small styles={{ textDecoration: 'underline' }}>
                See file templates
              </small>
            </a>
            {/* <Template
              show={this.state.show}
              handleClose={this.handleClose}
            ></Template> */}
            {/* <div style={{ clear: 'both' }}></div> */}
          </div>
        </div>
        {studentList}
      </div>
    );

    return <div style={{ margin: '2vh 8vh' }}>{StudentTool}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions.onFetchStudents(pid));
    },
    deleteStudent: (pid, sid) => {
      dispatch(actions.onDeleteStudent(pid, sid));
    },
    importStudents: (pid, students) => {
      dispatch(actions.onImportStudents(pid, students));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Students)
);
