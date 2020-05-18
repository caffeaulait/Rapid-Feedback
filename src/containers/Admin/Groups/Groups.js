import React from 'react';
import { connect } from 'react-redux';
import * as actions1 from '../../../store/actions/group';
import * as actions2 from '../../../store/actions/student';
import StudentCard from '../../../components/StudentCard/StudentCard';
import GroupCard from '../../../components/GroupCard/GroupCard';
import styles from './Groups.module.css';

function RenderTabs(tabs,tab,changeTabs){
  return tabs.map((item, idx) => {
    if(!item.isshow){
      return null;
    }
    if(idx === 0){
      var tabname = "student"
    }else{
      var tabname1 = "group"
    }
    return(
      <div style={{display: 'flex', width:'50vh'}}>
        <p 
        style={{fontSize:'30px'}}
        key={item.index} 
        className = { tab === idx ? 'active' :'' }  
        onClick={()=>{changeTabs(idx)}}>
        {tabname}
        </p>
        <p 
        style={{fontSize:'30px'}}
        key={item.index} 
        className = { tab === idx ? 'active' :'' }  
        onClick={()=>{changeTabs(idx)}}>
        {tabname1}
        </p>
      </div>
    )
  })
}

// const showMain = (idx) => {
//   switch (idx) {
//     case 0:
//       return <div>Student</div>
//       break;
//     case 1:
//       return <div>Group</div>
//       break;
//     default:
//       break;
//   }
// }

class Groups extends React.Component {
  constructor(props) {
    super(props);
    const tabs =[
      {name:'tab',index:0,isshow:true},
      {name:'tab',index:1,isshow:true},
    ]
    this.state = {
      projectid: null,
      tab:0,
      tabs
  };

  }
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

  changeTabe=(idx)=>{
    console.log(idx);
    this.setState({
      tab:idx
    });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  goToAdd = () => {
    this.props.history.push(`/admin/projects/${this.state.projectid}/students/add`);
  };

  goToAddGroup = () => {
    this.props.history.push(`/admin/projects/${this.state.projectid}/groups/add`);
  };

  delStudent = (pid, sid) => {

    this.props.deleteStudent(pid, sid);
  };

  delGroup = (pid, gid) => {

    this.props.deleteGroup(pid, gid);
  };
  

  render() {
    const {tabs,tab} =this.state;
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
        <GroupCard
        key={key}
        groupid = {key}
        students = {mapGroup[key]}
        delete={() => this.delGroup(this.state.projectid, key)}
      /> 
      )  
    }); 


    const StudentTool = (props) => {
      return (
        <div className="studentToolContaner">
          <h1 style={{fontSize:'40px', color:'#003f8a', fontWeight:'bold'}}>Student List</h1>
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

    const showMain = (idx) => {
      switch (idx) {
        case 0:
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
          )
          break;
        case 1:
          return (
            <div style={{ margin: '5vh 20vh' }}>
              <div className="groupToolContaner">
              <h1 style={{fontSize:'40px', color:'#003f8a', fontWeight:'bold'}}>Group List</h1>
              <button className={styles.back} onClick={this.goBack}>
                Back
                  </button>
              <button className={styles.add} onClick={this.goToAddGroup}>
                Add
                  </button>
            </div>
            <div style={{ marginTop: '5vh', marginLeft:'7vh', marginBottom: '-2vh', display: 'flex', fontSize: '30px', fontWeight: '900', height: '50px'}}>
              <p style={{ marginRight: '10vh' }}>Group</p>
              <p style={{ margin: '0 20vh' }}>Number</p>
              <p style={{ marginLeft: '10vh' }}>Name</p>
            </div>  
            <div>{groups}</div>
            </div>
          )
          break;
        default:
          break;
      }
    }


    return (

      // <div style={{ margin: '5vh 20vh' }}>
      //   <StudentTool></StudentTool>
      //   {/* <div style={{ display: 'flex', marginBottom: '5vh' }}>
      //     <h1 style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold' }}>Student List</h1>
      //     <button className={styles.back} onClick={this.goBack}>
      //       Back
      //     </button>
      //     <button className={styles.add} onClick={this.goToAdd}>
      //       Add
      //     </button>
      //     <button className={styles.import}>
      //       Import
      //     </button>
      //   </div> */}

      //   <div style={{ marginLeft: '4vh', display: 'flex', fontSize: '30px', fontWeight: '900', height: '50px', borderBottom: '2px solid #cccccc' }}>
      //     <p style={{ marginLeft: '3vh' }}>Number</p>
      //     <p style={{ margin: '0 25vh' }}>Name</p>
      //     <p>Email</p>
      //   </div>
      //   <div>
      //     {students}
      //   </div>

      // </div>
      <div className="tabchange-box">
        <ul>
          {RenderTabs(tabs,tab,this.changeTabe)}
        </ul>
        {showMain(tab)}
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
      dispatch(actions2.onFetchStudents(pid));
    },
    deleteStudent: (pid, sid) => {
      dispatch(actions2.onDeleteStudent(pid, sid));
    },
    deleteGroup: (pid, gid) => {
      dispatch(actions1.onDeleteGroup(pid, gid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
