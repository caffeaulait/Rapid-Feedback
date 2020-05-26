import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import StudentList from './StudentList';
import styles from '../Students/Students.module.css';


class GroupAdd extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    projectid: null,
    groid: 0,
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
  }
  clickStudentButton = (student) => {
    if(student.selected){
      this.props.deleteCurentStudent(student,this.props.students);
    }else{
      
      this.props.addCurrentStudent(student,this.props.students);
    }
  }
  confirmGroupStudent =() =>{
    let selectedStudent = this.props.students.map(function(val){
      if(val.selected){
        return {'student_id': val.id};
      }
    })
    let groupId = this.state.groid;
    this.props.confirmStudentGroup(this.state.projectid,groupId,selectedStudent);
    this.goBack();

  }

  

  render() {
    // if (!this.props.isAuthenticated) {
    //   this.props.history.replace('/login');
    // }
    //当前选中的students 
    let selectStudent =(
      <div>currnetStudent</div>
    )
    selectStudent = this.props.students.map((student,key)=>{
      if(student.selected){
        return (
          <div key={key}>{student.first_name + student.last_name}</div>
        )
      } 
    })
    
    let students = (
      <p style={{ textAlign: 'center' }}>Please add new student</p>
    );

    console.log(this.props.students);
    

    if (this.props.students) {
      students = this.props.students.map((student, key) => {
        if(student.group_id >= this.state.groid){
          this.setState({groid: student.group_id + 1});
        }
        if (student.group_id === 0){
        return (
          <StudentList
            key={key}
            student={student}
            delete={() => this.clickStudentButton(student)}
          />
        );}
      });
    }

    const StudentTool = (

        <div className='studentToolContaner'>
          <div>Group: {this.state.groid}</div>
          <button onClick={this.confirmGroupStudent} style={{float:'right'}}>confirm</button>
          <div style={{display:'flex'}}>
          <div>Current Group Member:</div>
          <div>{selectStudent}</div>
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
    

    return (
      <div style={{ margin: '5vh 20vh' }}>
        {StudentTool}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
    currentStudents : state.currentStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions.onFetchStudents(pid));
    },
    addCurrentStudent:(student,students) =>{
      dispatch(actions.addCurrentStudent(student,students));
    },
    deleteCurentStudent: (student,students) => {
      dispatch(actions.deleteCurentStudent(student,students));
    },
    confirmStudentGroup:(pid,groupId,students)=> {
      dispatch(actions.confirmStudentGroup(pid,groupId,students))
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdd);
