import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import StudentCard from '../../../components/StudentCard/StudentCard';
import styles from './Students.module.css';



class Students extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    projectid: null,
  };

  // }
  componentDidMount() {
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    if (this.props.students) {
      if (this.props.students.length === 0) {
        console.log('fetching students');
        this.props.fetchStudents(proid);
      }
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  goToAdd = () => {
    this.props.history.push(`/admin/projects/${this.state.projectid}/students/add`);
  };

  delStudent = (pid, sid) => {

    this.props.deleteStudent(pid, sid);
  };


  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }

    let students = <p style={{ textAlign: 'center' }}>Please add new student</p>;

    console.log(this.props.students);
    if (this.props.students) {
      students = this.props.students.map((student, key) => {
        return (
          <StudentCard
            key={key}
            student={student}
            delete={() => this.delStudent(this.state.projectid, student.id)}
          />
        );
      });
    }
    const StudentTool = (props) => {
      return (
        <div className="studentToolContaner">
          <h1 style={{fontSize:'40px', color:'#003f8a', fontWeight:'bold'}}>Student List</h1>
          <br/>
          <button className={styles.back} onClick={this.goBack}>
            Back
               </button>
          <button className={styles.add} onClick={this.goToAdd}>
            Add
              </button>
          <button className={styles.import}>
            Import
              </button>
        </div>
      )
    }




    return (

      <div style={{ margin: '5vh 20vh' }}>
        <StudentTool></StudentTool>
        {/* <div style={{ display: 'flex', marginBottom: '5vh' }}>
          <h1 style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold' }}>Student List</h1>
          <button className={styles.back} onClick={this.goBack}>
            Back
          </button>
          <button className={styles.add} onClick={this.goToAdd}>
            Add
          </button>
          <button className={styles.import}>
            Import
          </button>
        </div> */}

        <div style={{ marginTop: '5vh', display: 'flex', fontSize: '30px', fontWeight: '900', height: '50px', borderBottom: '2px solid #cccccc' }}>
          <p>Number</p>
          <p style={{ margin: '0 20vh' }}>Name</p>
          <p>Email</p>
        </div>        
        <div>
          {students}
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
    fetchStudents: (pid) => {
      dispatch(actions.onFetchStudents(pid));
    },
    deleteStudent: (pid, sid) => {
      dispatch(actions.onDeleteStudent(pid, sid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
