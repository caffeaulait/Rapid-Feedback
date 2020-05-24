import React from 'react';
import { connect } from 'react-redux';
import * as actions1 from '../../../store/actions/student';
import * as actions2 from '../../../store/actions/project';
import ReviewStu from '../../../components/ReviewStu/ReviewStu';
import ReviewProjectCard from '../../../components/ReviewProjectCard/ReviewProjectCard';
import styles from './Review.module.css';


class ReviewList extends React.Component {

  state = {
    projectid: null,
    isgroup: 0,
  };


  componentDidMount() {  

    if (this.props.projects.length === 0) {
        console.log('fetching projects');
        this.props.fetchProjects();
      }


    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    if (this.props.students) {
      if (this.props.students.length === 0) {
        console.log('fetching students');
        this.props.fetchStudents(proid);
      }
    }
    
    // if (this.props.projects.length !== 0) {
    //     console.log(this.props.projects);
    //     projects = this.props.projects.map((project) => {
    //       return (
    //         <ReviewProjectCard
    //           key={project.id}
    //           project={project}
    //           review={() => this.projectSelectedHandler(project.id)}
    //         />
    //       );
    //     });
    //   }
  }

  

  reviewStudent = (sid) => {
      if (this.state.isgroup === 0){
        this.props.history.push(`/report/projects/${this.state.projectid}/students/` + sid);
      }else{
        this.props.history.push(`/report/projects/${this.state.projectid}/groups/` + sid);
      }
  };

  render() {

    
    let students = <p style={{ textAlign: 'center' }}>Please add new student</p>;

    console.log(this.props.students);
    if (this.props.students) {
      students = this.props.students.map((student, key) => {
        return (
          <ReviewStu
            key={key}
            student={student}
            review={() => this.reviewStudent(student.id)}
          />
        );
      });
    }
    

    return (

      <div>

          
        {/* <div className = {styles.card}>
            <h1 style={{marginBottom:'5vh'}}>Current Project:</h1>
            <h2 style={{marginBottom:'10vh', color:'black'}}>Comp90082 Assignment1</h2>
            <ul>
                <li style={{fontWeight: "bold", borderBottom: '2px solid #cccccc'}}>Comp90082 Assignment1</li>
                <li onClick={this.goToGroup}>COMP90015 Assignment2</li>
                <li>INFO90023 Assignment1</li>
                <li>SWEN90081 Assignment3</li>
                <li>COMP90051 Assignment1</li>
            </ul>
        </div> */}
        <div>
            <div style={{ marginTop: '5vh', display: 'flex', fontSize: '30px', fontWeight: '900', height: '50px', borderBottom: '2px solid #cccccc' }}>
                <p>Number</p>
                <p style={{ margin: '0 20vh' }}>Name</p>
                <p>Status</p>
            </div>        
            <div>
                {students}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions1.onFetchStudents(pid));
    },
    fetchProjects: () => {
        dispatch(actions2.onFetchProjects());
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
