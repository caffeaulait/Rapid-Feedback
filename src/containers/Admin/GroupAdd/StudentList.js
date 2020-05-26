import React from 'react';
import styles from '../../../components/StudentCard/StudentCard.module.css';

const StudentList = (props) => {


        return (
        <tr>
          <td>{props.student.uni_student_number}</td>
          <td>{props.student.first_name +" "+ props.student.last_name}</td>
          <td>{props.student.uni_email}</td>
          <td><button onClick={props.delete} className={styles.delete}>{props.student.selected?'DELETE':'ADD'}</button></td>
        </tr>
        );
}

export default StudentList;