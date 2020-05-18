import React from 'react';
import styles from './StudentTab.module.css';

const StudenTab = (props) => {
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
    </div>
  );
};

export default StudenTab;
