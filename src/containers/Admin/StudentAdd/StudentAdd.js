/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/student';
import styles from './StudentAdd.module.css';
import { withRouter } from 'react-router-dom';

class StudentAdd extends React.Component {
  state = {
    projectid: null,
    project: null,
    student: { stuNo: '', firstName: '', lastName: '', email: '', id: null },
  };

  componentDidMount() {
    const pid = parseInt(this.props.match.params.pid);
    this.setState({ projectid: pid });
    // console.log(this.state.projectid);
    const foundProj = this.props.projects.find((el) => el.id == pid);
    this.setState({ project: foundProj });
  }

  inputChange = (event) => {
    let type = event.target.name;
    // const value = event.target.value;
    let val = event.target.value;
    console.log(event.target.value);
    let data = Object.assign({}, this.state.student, {
      [type]: val,
    });
    this.setState({
      student: data,
    });
    console.log(this.state.student, data);
  };

  goBack = (event) => {
    event.preventDefault();
    // console.log('goback');
    this.props.history.goBack();
  };

  addStudent = (event) => {
    event.preventDefault();
    this.props.createStudent(this.state.student, this.state.projectid);
    console.log(this.state.student);
    if (this.state.project.is_group === 0) {
      this.props.history.push(
        `/admin/projects/${this.state.projectid}/students`
      );
    } else {
      this.props.history.push(`/admin/projects/${this.state.projectid}/groups`);
    }
  };

  render() {
    // let redirect = null;
    // if (!this.props.isAuthenticated) {
    //   redirect = <Redirect to='/'></Redirect>;
    // }
    //   {/* {redirect} */}
    return (
      <div style={{ margin: '5vh 20vh' }}>
        <div style={{ marginBottom: '5vh' }}>
          <h1
            style={{ fontSize: '40px', color: '#003f8a', fontWeight: 'bold' }}
          >
            Add New Student
          </h1>
        </div>

        <div style={{ border: '1px solid #cccccc' }}>
          <form
            onSubmit={this.addStudent}
            style={{ textAlign: 'center', margin: '5vh' }}
          >
            <label className={styles.sp}>Student Number:</label>
            <input
              type='text'
              name='stuNo'
              value={this.state.student.stuNo || ''}
              onChange={(event) => this.inputChange(event)}
              style={{ marginLeft: '10vh' }}
            />

            <br />
            <label className={styles.sp}>First Name:</label>
            <input
              name='firstName'
              type='text'
              value={this.state.student.firstName || ''}
              onChange={(event) => this.inputChange(event)}
              style={{ marginLeft: '10vh' }}
            />
            <br />
            <label className={styles.sp}>Last Name:</label>
            <input
              name='lastName'
              type='text'
              value={this.state.student.lastName || ''}
              onChange={(event) => this.inputChange(event)}
              style={{ marginLeft: '10vh' }}
            />
            <br />
            <label className={styles.sp}>Email:</label>
            <input
              name='email'
              type='text'
              value={this.state.student.email || ''}
              onChange={(event) => this.inputChange(event)}
              style={{ marginLeft: '10vh' }}
            />
            <br />
            <button className={styles.submit} type='submit'>
              submit
            </button>
            <div style={{ marginTop: '5vh' }}>
              <button className={styles.cancel} onClick={this.goBack}>
                cancel
              </button>
            </div>
          </form>
        </div>
        <br />

        {/* <div style={{display:'flex', marginLeft:'20vh', marginTop:'5vh'}}>
          <button className={styles.cancel} onClick={this.goBack}>
            cancel
          </button>
          
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    projects: state.proj.projects,
    // students: state.student.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent: (data, pid) => {
      dispatch(actions.onCreateStudent(data, pid));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentAdd)
);
