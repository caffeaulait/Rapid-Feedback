import React from 'react';
import StudenTab from '../../../components/StudentTab/StudentTab';
import styles from './SendReport.module.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GroupTab from '../../../components/GroupTab/GroupTab';

class SendReport extends React.Component {
  state = {
    hasVoice: true,
    option: '0',
  };

  handleChange = (event) => {
    this.setState({ option: event.target.value });
  };
  onUpload = () => {
    this.record();
  };

  onDelete = () => {};

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
    const isGroup = true;
    let tab = null;
    if (isGroup) {
      tab = (
        <GroupTab
          onUpload={this.onUpload}
          hasVoice={this.state.hasVoice}
        ></GroupTab>
      );
    } else {
      tab = (
        <StudenTab
          onUpload={this.onUpload}
          hasVoice={this.state.hasVoice}
        ></StudenTab>
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
            <span className={styles.grade}>&nbsp; 16.8 &nbsp;</span>
          </div>
          <div className={styles.btnGroup}>
            <button className={'btn btn-primary ' + styles.backBtn}>
              Back
            </button>
            <button className={'btn btn-danger ' + styles.confirmBtn}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SendReport;
