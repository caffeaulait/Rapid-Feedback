import React from 'react';
import { connect } from 'react-redux';
import * as actions1 from '../../../store/actions/project';
import * as actions2 from '../../../store/actions/student';
import ReviewGro from '../../../components/ReviewGro/ReviewGro';
import styles from './Review.module.css';
import Header from '../../../components/Header/Header';




class ReviewGroup extends React.Component {

  state = {
    projectid: null,
  };


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


  goToReport = () => {
    this.props.history.push(`/report`);
  };

  render() {


    let students = <p style={{ textAlign: 'center' }}>Please add new student</p>;

    console.log(this.props.students);


    //group by student according to group_id
    let arr = this.props.students.slice();
    var mapGroup = {};
    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i];
      let groupId = temp.group_id;
      if(typeof(mapGroup[groupId]) == "undefined"){
        var groupArr = [];
        groupArr.push(temp);
        mapGroup[groupId] = groupArr;
      }else{
        mapGroup[groupId].push(temp);
      }
    };
    let groups = Object.keys(mapGroup).map(function(key){
      return(
        <ReviewGro
        key={key}
        groupid = {key}
        students = {mapGroup[key]}
      /> 
      )  
    }); 
    

    return (
    <div>
        <Header />
      <div style={{display: 'flex'}}>
        <div className = {styles.card}>
            <h1 style={{marginBottom:'5vh'}}>Current Project:</h1>
            <h2 style={{marginBottom:'10vh', color:'black'}}>COMP90015 Assignment2</h2>
            <ul>
                <li onClick={this.goToReport}>Comp90082 Assignment1</li>
                <li style={{fontWeight: "bold", borderBottom: '2px solid #cccccc'}}>COMP90015 Assignment2</li>
                <li>INFO90023 Assignment1</li>
                <li>SWEN90081 Assignment3</li>
                <li>COMP90051 Assignment1</li>
            </ul>
        </div>
        <div>
            <div style={{ marginTop: '5vh', display: 'flex', fontSize: '30px', fontWeight: '900', height: '50px', borderBottom: '2px solid #cccccc' }}>
                <p style={{ marginLeft: '5vh' }}>Group</p>
                <p style={{ marginLeft: '20vh' }}>Number</p>
                <p style={{ marginLeft: '5vh' }}>Name</p>
                <p style={{ marginLeft: '5vh' }}>Status</p>
            </div>        
            <div>
                {groups}
            </div>
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
      dispatch(actions2.onFetchStudents(pid));
    },
    fetchProjects: () => {
        dispatch(actions1.onFetchProjects());
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewGroup);
