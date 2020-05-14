import React from 'react';
import styles from './Project.module.css';
// import * as format from '../../util/date';

const Project = (props) => {
  //   const date = props.project.date;
  //   const year = date.getFullYear();
  //   const month = format.months[date.getMonth()];
  //   const day = date.getDate();
  return (
    <div className={styles.projBox}>
      <div className={styles.top}>
        <h1>{props.project.proj_name}</h1>
        <p>31 Mar 2020</p>
        {/* <p>
          {day} {month} {year}
        </p> */}
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
