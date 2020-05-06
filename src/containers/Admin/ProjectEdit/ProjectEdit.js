/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/project';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import styles from './ProjectEdit.module.css';

class ProjectEdit extends React.Component {
  state = {
    subjectCode: '',
    subjectName: '',
    projectName: '',
    durationMin: '',
    durationSec: '',
    description: '',
    isGroup: true,
    id: null,
    date: new Date(),
  };

  componentDidMount() {
    console.log(this.props.location.search);
    const params = queryString.parse(this.props.location.search);
    const id = params.id;
    if (id != null) {
      const project = this.props.projects.find((el) => el.id == id);
      //   console.log(project);
      if (project) {
        this.setState({
          subjectCode: project.subject_code,
          subjectName: project.subject_name,
          projectName: project.proj_name,
          durationMin: project.duration_min,
          durationSec: project.duration_sec,
          description: project.proj_description,
          isGroup: project.is_group == 1,
          id,
        });
      }
    }
  }

  inputChange = (event) => {
    let type = event.target.name;
    const value =
      type === 'isGroup' ? event.target.value === 'group' : event.target.value;
    this.setState({ [type]: value });
    // console.log(this.state);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  editProject = (event) => {
    event.preventDefault();
    // console.log(this.state);
    if (!this.state.id) {
      this.props.createProject(
        this.state.subjectCode,
        this.state.subjectName,
        this.state.projectName,
        this.state.durationMin,
        this.state.durationSec,
        this.state.description,
        this.state.isGroup
      );
    } else {
      this.props.updateProject(
        this.state.id,
        this.state.subjectCode,
        this.state.subjectName,
        this.state.projectName,
        this.state.durationMin,
        this.state.durationSec,
        this.state.description,
        this.state.isGroup
      );
    }
  };

  selectDate = (newDate) => {
    this.setState({ date: newDate });
    console.log(this.state.date);
  };

  render() {
    let redirect = null;
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to='/'></Redirect>;
    }
    return (
      <div className={styles.outer}>
        {redirect}
        <div className={styles.top}>
          <h1>Edit Project Information</h1>
          <button
            className={'btn btn-danger btn-lg ' + styles.cancel}
            onClick={this.goBack}
          >
            Cancel
          </button>
        </div>
        <div className={styles.formBox}>
          <div className='container'>
            <form
              onSubmit={this.editProject}
              className='form-horizontal col-12'
            >
              {/* <div className='form-group'>
                <label>Username</label>
                <input type='text' className='form-control' />
              </div> */}
              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Subject Code</b>
                </label>
                <input
                  type='text'
                  className='form-control col-sm-5'
                  name='subjectCode'
                  value={this.state.subjectCode}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>

              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Subject Name</b>
                </label>
                <input
                  type='text'
                  className='form-control col-sm-5'
                  name='subjectName'
                  value={this.state.subjectName}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>

              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Project Name</b>
                </label>
                <input
                  type='text'
                  className='form-control col-sm-5'
                  name='projectName'
                  value={this.state.projectName}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>

              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Project Duration</b>
                </label>
                <input
                  type='text'
                  className='form-control col-sm-1'
                  name='durationMin'
                  value={this.state.durationMin}
                  onChange={(event) => this.inputChange(event)}
                />
                &nbsp; <span>Minutes</span> &emsp;
                <input
                  type='text'
                  className='form-control col-sm-1'
                  name='durationSec'
                  value={this.state.durationSec}
                  onChange={(event) => this.inputChange(event)}
                />
                &nbsp; <span>Seconds</span>
              </div>

              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Due Date</b>
                </label>
                <DatePicker
                  className='form-control col-sm-9'
                  selected={this.state.date}
                  onChange={this.selectDate}
                ></DatePicker>
              </div>
              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  {' '}
                  <b>Type</b>{' '}
                </label>
                <div>
                  <input
                    type='radio'
                    name='isGroup'
                    defaultChecked
                    value='group'
                    onChange={(event) => this.inputChange(event)}
                  />{' '}
                  <span>Group</span>
                  &emsp;
                  <input
                    type='radio'
                    name='isGroup'
                    value='individual'
                    onChange={(event) => this.inputChange(event)}
                  />{' '}
                  <span>Individual</span>
                </div>
              </div>

              <div className='form-group form-row'>
                <label className='control-label col-sm-3'>
                  <b>Project Description</b>
                </label>
                <input
                  type='text'
                  className='form-control col-sm-6'
                  name='description'
                  value={this.state.description}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>

              <button
                type='submit'
                className={'btn btn-primary ' + styles.submit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: () => {
      dispatch(actions.onCreateProject());
    },
    updateProject: (id) => {
      dispatch(actions.onUpdateProject(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
