import React from 'react';
import styles from './Grades.module.css';
import StudenTab from '../../../components/StudentTab/StudentTab';
import Grade from '../../../components/Grade/Grade';

class Grades extends React.Component {
  state = {};

  toViewAssessment = () => {};

  render() {
    const grades = [
      {
        id: 1,
        grade: 16.0,
        marker: 'Tutor A',
        date: '9 Apr 2020',
      },
      {
        id: 2,
        grade: 17.0,
        marker: 'Tutor B',
        date: '10 Apr 2020',
      },
      {
        id: 3,
        grade: 15.0,
        marker: 'Tutor C',
        date: '11 Apr 2020',
      },
    ];

    let tab = <StudenTab></StudenTab>;

    const gradeRow = grades.map((el) => (
      <Grade
        key={el.id}
        index={el.id}
        grade={el.grade}
        marker={el.marker}
        date={el.date}
      ></Grade>
    ));

    return (
      <div className={styles.outer}>
        <div className={styles.left}>{tab}</div>
        <div className={styles.right}>
          <p> Below are marks for this student: </p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Grade</th>
                <th>Marker</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{gradeRow}</tbody>
          </table>

          <div className={styles.btnGroup}>
            <button className={'btn btn-danger ' + styles.controlBtn}>
              Back
            </button>
            <button className={'btn btn-primary ' + styles.controlBtn}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Grades;
