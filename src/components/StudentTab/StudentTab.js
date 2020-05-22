import React from 'react';
import styles from './StudentTab.module.css';
import Voice from '../../assets/images/voice.svg';

const StudenTab = (props) => {
  let voice = null;
  if (props.hasVoice) {
    voice = (
      <>
        <div className={styles.label}>Audio Comment: </div>
        <div>
          <img src={Voice} alt='voice'></img>
          <button onClick={() => props.onUpload()} className={styles.voiceBtn}>
            upload
          </button>
          <button className={styles.voiceBtn}>delete</button>
          <audio id='player' controls></audio>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className={styles.label}>StudentName: </div>
      <div className={styles.content}>Claire Huang</div>
      <div className={styles.label}>Student No: </div>
      <div className={styles.content}>123456</div>
      <div className={styles.label}>Subject: </div>
      <div className={styles.content}>Software Project</div>
      <div className={styles.label}>Project Name: </div>
      <div className={styles.content}>Assignment 1</div>
      {voice}
    </div>
  );
};

export default StudenTab;
