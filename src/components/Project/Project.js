import React from 'react';
import styles from './Project.module.css';

const Project = (props) => {
  return (
    <div className={styles.projBox}>
      <div className={styles.top}>
        <h1>{props.project.proj_name}</h1>
        <p>31 Mar 2020</p>
      </div>
      <div className={styles.bottom}>
        <span>
          Posted by: {props.project.subject_code} {props.project.subject_name}
        </span>
        <button className='btn btn-outline-primary' onClick={props.clicked}>
          {' '}
          See more >
        </button>
      </div>
    </div>
  );
};

export default Project;
