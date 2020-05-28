import React from 'react';
import styles from './StudentTab.module.css';
import Voice from '../../assets/images/voice.svg';

const StudenTab = (props) => {
  const student = props.student;
  const project = props.project;
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
      <div className={styles.content}>
        {student.first_name}&nbsp;{student.last_name}
      </div>
      <div className={styles.label}>Student No: </div>
      <div className={styles.content}>{student.uni_student_number}</div>
      <div className={styles.label}>Subject: </div>
      <div className={styles.content}>
        {project.subject_code}&nbsp;{project.subject_name}
      </div>
      <div className={styles.label}>Project Name: </div>
      <div className={styles.content}>{project.proj_name}</div>
      {voice}
    </div>
  );
};

export default StudenTab;
