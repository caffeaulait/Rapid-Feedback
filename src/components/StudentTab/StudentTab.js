import React from 'react';
import styles from './StudentTab.module.css';

const StudenTab = (props) => {
  const student = props.student;
  const project = props.project;

  return (
    <>
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
    </>
  );
};

export default StudenTab;
