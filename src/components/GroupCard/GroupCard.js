import React from 'react';
import styles from './GroupCard.module.css';
import Table from 'react-bootstrap/Table';

const GroupCard = (props) => {
  let studentGroup = props.students.map(function (student, index) {
    return (
      <tr style={{ marginTop: '3vh' }} key={student.id}>
        <td>{student.uni_student_number}</td>
        <td>{student.first_name + ' ' + student.last_name}</td>
        {/* <td>{student.uni_email}</td> */}
      </tr>
    );
  });

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>{'Group ' + props.groupid}</h2>
          <br />
          <li>
            <button onClick={props.delete} className={styles.delete}>
              Delete
            </button>
          </li>
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
      </div>
    </div>
  );
};

export default GroupCard;
