import React from 'react';
import styles from './StudentCard.module.css';

const StudentCard = (props) => {
  let groupInfo = null;
  if (props.isGroup) {
    groupInfo = (
      <td>{props.student.group_id === 0 ? 'N/A' : props.student.group_id}</td>
    );
  }

  return (
    <tr>
      <td>{props.student.uni_student_number}</td>
      <td>{props.student.first_name + ' ' + props.student.last_name}</td>
      <td>{props.student.uni_email}</td>
      {groupInfo}
      <td>
        <button onClick={props.delete} className={styles.delete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentCard;
