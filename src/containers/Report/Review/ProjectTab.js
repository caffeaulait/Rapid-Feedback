import React from 'react';
import styles from './ProjectTab.module.css';

class ProjectTab extends React.Component {


  render() {
    let scoreGet = this.props.result.map(a => a.point).reduce((a, b) => a + b, 0);
    let scoreTotal = this.props.criteria.map(a => a.point).reduce((a, b) => a + b, 0);
    return (
      <div>
        <div className={styles.label}>Student Name: </div>
        <div className={styles.content}>{this.props.studentInfo.studentName}</div>
        <div className={styles.label}>Student ID: </div>
        <div className={styles.content}>{this.props.studentInfo.studentId}</div>
        <div className={styles.label}>Subject: </div>
        <div className={styles.content}>{this.props.studentInfo.subject}</div>
        <div className={styles.label}>Project Name: </div>
        <div className={styles.content}>{this.props.studentInfo.projectName}</div>
        <div className={styles.label}>Assessed On: </div>
        <div className={styles.content}>{this.props.assessDate}</div>
        <div className={styles.label}>Assessed By: </div>
        <div className={styles.content}>{this.props.markerInfo.name}</div>
        <div className={styles.label}>Overall Result: </div>
        <div className={styles.content}>{scoreGet + " / " + scoreTotal}</div>
      </div>
    );
  }

}

export default ProjectTab;
