/* eslint-disable eqeqeq */
import React from 'react';
import StudenTab from '../../../components/StudentTab/StudentTab';
import styles from './SendReport.module.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GroupTab from '../../../components/GroupTab/GroupTab';
import queryString from 'query-string';
import { connect } from 'react-redux';
import * as result from '../../../store/actions/result';

class SendReport extends React.Component {
  state = {
    hasVoice: true,
    option: '0',
    student: null,
    grades: [],
    project: null,
    students: [],
    isGroup: false,
    score: 0,
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const score = params.score;
    const projectId = this.props.match.params.pid;
    const studentId = this.props.match.params.sid;
    const groupId = this.props.match.params.gid;
    const project = this.props.projects.find((el) => el.id == projectId);
    const isGroup = project ? project.is_group : false;
    const student = this.props.students.find((el) => el.id == studentId);
    const students = this.props.students.filter((el) => el.group_id == groupId);
    console.log('group students are:' + students);
    this.setState({
      student: student,
      project: project,
      students: students,
      isGroup: isGroup,
      score: score,
    });
  }

  handleChange = (event) => {
    this.setState({ option: event.target.value });
  };
  onUpload = () => {
    this.record();
  };

  onDelete = () => {};

  onSend = () => {
    const studentIdList = [];
    if (!this.props.isGroup) {
      studentIdList.push(this.props.student.id);
    } else {
      studentIdList.concat(this.props.students.map((student) => student.id));
    }
    const data = {
      project_id: this.projectId,
      studentIdList,
      option: parseInt(this.state.option),
    };
    this.props.sendReport(data);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  record = () => {
    const player = document.getElementById('player');

    const handleSuccess = function (stream) {
      if (window.URL) {
        player.srcObject = stream;
      } else {
        player.src = stream;
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    let tab = null;
    if (this.state.student) {
      tab = (
        <StudenTab
          hasVoice={this.state.hasVoice}
          project={this.state.project}
          student={this.state.student}
        ></StudenTab>
      );
    }
    if (this.state.isGroup && this.state.students.length > 0) {
      tab = (
        <GroupTab
          students={this.state.students}
          project={this.state.project}
          hasVoice={this.state.hasVoice}
        ></GroupTab>
      );
    }

    return (
      <div className={styles.outer}>
        <div className={styles.left}>{tab}</div>
        <div className={styles.right}>
          <div className={styles.radios}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>
                {' '}
                <p className={styles.remind}>
                  <em>
                    choose one of the options below, and click 'confirm' to send
                    report
                  </em>
                </p>
              </FormLabel>
              <RadioGroup
                aria-label='sendType'
                name='sendType'
                value={this.state.option}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value='0'
                  control={<Radio />}
                  label='Send report to teaching team only'
                />
                <FormControlLabel
                  value='1'
                  control={<Radio />}
                  label='Send report to student only'
                />
                <FormControlLabel
                  value='2'
                  control={<Radio />}
                  label='Send report to both teaching team and student'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.textBox}>
            Final Grade: &emsp;{' '}
            <span className={styles.grade}>
              &nbsp; {this.state.score} &nbsp;
            </span>
          </div>
          <div className={styles.btnGroup}>
            <button
              className={'btn btn-primary ' + styles.sendBtn}
              onClick={this.onSend}
            >
              Send
            </button>
            <button
              className={'btn btn-danger ' + styles.backBtn}
              onClick={this.goBack}
            >
              Back
            </button>
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
    results: state.result.allResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendReport: (data) => {
      dispatch(result.onSendReport(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendReport);
