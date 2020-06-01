import React from 'react';
import styles from './GroupTab.module.css';

const GroupTab = (props) => {
  const students = props.students;
  let groupId = 0;
  if (students.length > 0) groupId = students[0].group_id;
  const project = props.project;
  return (
    <>
      <div className={styles.label}>Group Members: </div>
      <div className={styles.content}>
        {students.map((el) => el.first_name + ' ' + el.last_name + ', ')}
      </div>
      <div className={styles.label}>Group No: </div>
      <div className={styles.content}>{groupId}</div>
      <div className={styles.label}>Subject: </div>
      <div className={styles.content}>
        {project.subject_code} {project.subject_name}
      </div>
      <div className={styles.label}>Project Name: </div>
      <div className={styles.content}>{project.proj_name}</div>
    </>
  );
};

export default GroupTab;
