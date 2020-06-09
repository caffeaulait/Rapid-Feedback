/* eslint-disable jsx-a11y/anchor-is-valid */
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
// import queryString from 'query-string';
import { connect } from 'react-redux';
import * as result from '../../../store/actions/result';
import Voice from '../../../assets/images/voice.svg';
// import Recorder from 'recorderjs';

let URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

class SendReport extends React.Component {
  state = {
    option: '1',
    student: null,
    grades: '',
    project: null,
    students: [],
    isGroup: false,
    score: 0,
    projectId: null,
    src: null,
    recording: false,
    download: null,
    blob: null,
    filename: 'audio file',
    sent: false,
  };

  componentDidMount() {
    // const params = queryString.parse(this.props.location.search);
    const projectId = this.props.match.params.pid;
    const studentId = this.props.match.params.sid;
    const groupId = this.props.match.params.gid;
    const project = this.props.projects.find((el) => el.id == projectId);
    let isGroup = false;
    if (project && project.is_group == 1) isGroup = true;
    const student = this.props.students.find((el) => el.id == studentId);
    const students = this.props.students.filter((el) => el.group_id == groupId);
    let grades = new URLSearchParams(this.props.location.search).get('grades');
    grades = grades.substr(0, Math.min(4, grades.length));
    // console.log(typeof grades);

    console.log('group students are:' + students);
    this.setState({
      student: student,
      project: project,
      students: students,
      isGroup: isGroup,
      grades: grades,
      projectId: parseInt(projectId),
    });
  }

  handleChange = (event) => {
    this.setState({ option: event.target.value });
  };

  onUpload = () => {
    let studentIdList = [];
    const formData = new FormData();
    if (!this.state.isGroup) {
      studentIdList.push(this.state.student.id);
    } else {
      const ids = this.state.students.map((el) => el.id);
      studentIdList = studentIdList.concat(ids);
      console.log(studentIdList);
    }
    let strList = this.listToString(studentIdList);
    formData.append('project_id', this.state.projectId);
    formData.append('studentIdList', strList);
    formData.append('audio', this.state.blob, this.state.filename);
    this.props.uploadAudio(formData);
  };

  listToString = (list) => {
    let result = '';
    for (let i = 0; i < list.length; i++) {
      result = result + list[i];
      if (i !== list.length - 1) {
        result = result + ',';
      }
    }
    return result;
  };

  onRecord = () => {
    console.log('recordButton clicked');

    /*
      Simple constraints object, for more advanced audio features see
      https://addpipe.com/blog/audio-constraints-getusermedia/
    */

    var constraints = { audio: true, video: false };

    /*
        Disable the record button until we get a success or fail from getUserMedia() 
    */

    this.recordButton.disabled = true;
    this.stopButton.disabled = false;

    /*
        We're using the standard promise based getUserMedia() 
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log(
          'getUserMedia() success, stream created, initializing Recorder.js ...'
        );

        /*
        create an audio context after getUserMedia is called
        sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
        the sampleRate defaults to the one set in your OS for your playback device
      */
        audioContext = new AudioContext();

        // //update the format
        // document.getElementById('formats').innerHTML =
        //   'Format: 1 channel pcm @ ' + audioContext.sampleRate / 1000 + 'kHz';

        /*  assign to gumStream for later use  */
        gumStream = stream;

        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);

        /* 
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
      */
        rec = new window.Recorder(input, { numChannels: 1 });

        //start the recording process
        rec.record();

        console.log('Recording started');
      })
      .catch((err) => {
        //enable the record button if getUserMedia() fails
        this.recordButton.disabled = false;
        this.stopButton.disabled = true;
        console.log(err);
      });
  };

  onStop = () => {
    console.log('stopButton clicked');

    //disable the stop button, enable the record too allow for new recordings
    this.stopButton.disabled = true;
    this.recordButton.disabled = false;

    //tell the recorder to stop the recording
    rec.stop();

    //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(this.createDownloadLink);
  };

  createDownloadLink = (blob) => {
    // console.log(blob);
    var url = URL.createObjectURL(blob);
    //name of .wav file to use during upload and download (without extendion)
    var filename = new Date().toISOString();

    this.setState({
      src: url,
      recording: true,
      download: filename + '.wav',
      blob: blob,
      filename: filename,
    });
  };

  onSend = () => {
    let studentIdList = [];
    if (!this.state.isGroup) {
      studentIdList.push(this.state.student.id);
    } else {
      const ids = this.state.students.map((el) => el.id);
      studentIdList = studentIdList.concat(ids);
      console.log(studentIdList);
    }
    const data = {
      project_id: this.state.projectId,
      studentIdList,
      option: parseInt(this.state.option),
    };
    this.props.sendReport(data);
    this.setState({ sent: true });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
    let voice = (
      <>
        <div className={styles.label}>Audio Comment: </div>
        <div>
          <img src={Voice} alt='voice'></img>
          <button
            onClick={() => this.onRecord()}
            className={styles.voiceBtn}
            ref={(ref) => (this.recordButton = ref)}
          >
            record
          </button>
          <button
            className={styles.voiceBtn}
            onClick={() => this.onStop()}
            ref={(ref) => (this.stopButton = ref)}
          >
            stop
          </button>
          <ol id='recordingsList' ref={(ref) => (this.recordingsList = ref)}>
            <li style={{ display: this.state.recording ? 'block' : 'none' }}>
              <audio controls={true} src={this.state.src}></audio>
              <div>
                <a
                  href={this.state.src}
                  download={this.state.download}
                  className={'btn btn-link ' + styles.download}
                >
                  Download
                </a>
                <a
                  href='#'
                  className={'btn btn-link ' + styles.download}
                  onClick={() => this.onUpload()}
                >
                  Upload
                </a>
              </div>
            </li>
          </ol>
        </div>
      </>
    );
    let tab = null;
    if (this.state.student) {
      tab = (
        <>
          <StudenTab
            hasVoice={this.state.hasVoice}
            project={this.state.project}
            student={this.state.student}
          ></StudenTab>
          {voice}
        </>
      );
    }
    if (this.state.isGroup && this.state.students.length > 0) {
      tab = (
        <>
          <GroupTab
            students={this.state.students}
            project={this.state.project}
            hasVoice={this.state.hasVoice}
          ></GroupTab>
          {voice}
        </>
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
                  value='1'
                  control={<Radio />}
                  label='Send report to teaching team only'
                />
                <FormControlLabel
                  value='2'
                  control={<Radio />}
                  label='Send report to student only'
                />
                <FormControlLabel
                  value='3'
                  control={<Radio />}
                  label='Send report to both teaching team and student'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.textBox}>
            Final Grade: &emsp;{' '}
            <span className={styles.grade}>
              &nbsp; {this.state.grades} &nbsp;
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
          <div
            className='alert alert-success'
            role='alert'
            style={{
              display: this.state.sent ? 'block' : 'none',
              marginTop: '2vh',
            }}
          >
            The report has been sent!
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
    uploadAudio: (data) => {
      dispatch(result.onUploadAudio(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendReport);
