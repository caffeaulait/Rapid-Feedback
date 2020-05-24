import React from 'react';
import styles from './ProjectTab.module.css';

class ProjectTab extends React.Component {


  render() {
    let scoreGet = this.props.result.map(a => a.point).reduce((a, b) => a + b, 0);
    let scoreTotal = this.props.criteria.map(a => a.point).reduce((a, b) => a + b, 0);
    let options = this.props.markers.map((marker) => {
      return <option key={marker.id} value={marker.name}>{marker.name}</option>
    })
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
        <div className={styles.content}>
          <select id="mySelect" style={{ width: "40%" }} onChange={(e) => this.props.setMarker(e.target.value)}>
            {options}
            <option value="Course Coordinator">Course Coordinator</option>
          </select><br />
        </div>
        <div className={styles.label}>Overall Result: </div>
        <div className={styles.content}>{scoreGet.toFixed(2) + " / " + scoreTotal.toFixed(2)}</div>
      </div>
    );
  }

}

export default ProjectTab;
