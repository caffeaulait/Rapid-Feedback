import React from 'react';
import styles from './StudentCard.module.css';

const StudentCard = (props) => {


        return (
        <tr>
          <td>{props.student.uni_student_number}</td>
          <td>{props.student.first_name +" "+ props.student.last_name}</td>
          <td>{props.student.uni_email}</td>
          <td><button onClick={props.delete} className={styles.delete}>Delete</button></td>
        </tr>
        );
}

export default StudentCard;