/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import SelectStuCard from './SelectStuCard';
import SelectGroCard from'./SelectGroCard';
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
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    const foundProj = this.props.projects.find((el) => el.id == proid);
    this.setState({ project: foundProj });

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

  goStuAssess = (sid) => {
    this.props.history.push(`/assess/projects/${this.state.projectid}/students/` + sid);
  };

  goGroAssess = (gid) => {
    this.props.history.push(`/assess/projects/${this.state.projectid}/groups/` + gid);
  };

  render() {


    let students = (
      <p style={{ textAlign: 'center' }}>Student</p>
    );

    console.log(this.props.students);
    if (this.props.students) {
      students = this.props.students.map((student, key) => {
        return (
          <SelectStuCard
            key={key}
            student={student}
            assess={() => this.goStuAssess(student.id)}
            assessed={() => this.goStuAssess(student.id)}
          />
        );
      });
    }

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
    let groups = Object.keys(mapGroup).map((key, index) =>{
      if(index !== 0){
      return(
        <SelectGroCard
        key={index}
        groupid = {key}
        students = {mapGroup[key]}
        assess={() => this.goGroAssess(key)}
        assessed={() => this.goGroAssess(key)}
      /> 
      );} 
    }); 

    const StudentTool = (
    //   return (
        <div>
            <div style={{display:'flex', marginBottom:'5vh'}}>
            <h1
                style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold', marginRight: '20vh'}}
            >
                Student List
            </h1>
            <button className={styles.back} onClick={this.goBack}>
                Back
            </button>
            </div>
            <table className={styles.gradeTable}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{students}</tbody>
          </table>

        </div>
      );
    // };

    const GroupTool = (
        // return (
          <div>
              <div style={{display:'flex', marginBottom:'5vh'}}>
              <h1
                  style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold', marginRight: '20vh'}}
              >
                  Group List
              </h1>
              <button className={styles.back} onClick={this.goBack}>
                  Back
              </button>
              </div>
              {/* <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                      <TableHead>
                      <TableRow>
                          <StyledTableCell>Group</StyledTableCell>
                          <StyledTableCell align="center">Number</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="right">Status</StyledTableCell>
                      </TableRow>
                      </TableHead>
                  </Table>
              </TableContainer>
              <div>{groups}</div> */}
              <table className={styles.gradeTable}>
                    <thead>
                    <tr>
                        <th>Group</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>{groups}</tbody>
                </table>
          </div>
        );
    //   };
  
      let list = <p>Failed</p>;
      if (this.state.project) {
        list = (
            <div>
                  {this.state.project.is_group == 1 ? GroupTool : StudentTool}
            </div>
          );
      }

    return (
      <div style={{ margin: '5vh 20vh' }}>
          {/* {StudentTool} */}
        {/* {GroupTool} */}
        {list}
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
      dispatch(actions.onFetchStudents(pid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
