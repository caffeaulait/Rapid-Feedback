import React from 'react';
import styles from './Project.module.css';

const Project = (props) => {
  return (
    <div className={styles.projBox}>
      <p>{props.project.proj_name}</p>
      <p>
        Posted by: {props.project.subject_ame} {props.project.subject_code}
      </p>
      <h1>31 Mar 2020</h1>
    </div>
  );
};

export default Project;
