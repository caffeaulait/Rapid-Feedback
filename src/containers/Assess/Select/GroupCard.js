import React from 'react';
import styles from './GroupCard.module.css';
import Table from 'react-bootstrap/Table';

const GroupCard = (props) => {
  let studentGroup = props.students.map((student) => (
    <tr style={{ marginTop: '3vh' }} key={student.id}>
      <td>{student.uni_student_number}</td>
      <td>{student.first_name + ' ' + student.last_name}</td>
      {/* <td>{student.uni_email}</td> */}
    </tr>
  ));
  let isAssessed = false;
  for (let student of props.students) {
    if (student.isAssessed) {
      isAssessed = true;
      break;
    }
  }
  let btn = isAssessed ? (
    <button
      onClick={props.assess}
      className={'btn btn-outline-success ' + styles.assess}
    >
      Assessed
    </button>
  ) : (
    <button
      onClick={props.assess}
      className={'btn btn-outline-primary ' + styles.assess}
    >
      Assess
    </button>
  );

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>{'Group ' + props.groupid}</h3>
        </div>

        <div className={styles.right}>
          <Table responsive>
            <thead>
              <tr>
                <td>
                  <b>Student ID</b>
                </td>
                <td>
                  <b>Name</b>
                </td>
                {/* <td><b>Email</b></td> */}
              </tr>
            </thead>
            <tbody>{studentGroup}</tbody>
          </Table>
        </div>
        <div className={styles.btnContainer}>{btn}</div>
      </div>
    </div>
  );
};

export default GroupCard;
