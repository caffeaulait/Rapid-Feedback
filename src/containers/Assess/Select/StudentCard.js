import React from 'react';
import styles from './StudentCard.module.css';

const StudentCard = (props) => {
  return (
    <tr>
      <td>{props.student.uni_student_number}</td>
      <td>{props.student.first_name + ' ' + props.student.last_name}</td>
      <td>{props.student.uni_email}</td>
      <td>
        {props.student.isAssessed === 0 ? (
          <button
            onClick={props.assess}
            className={'btn btn-outline-primary ' + styles.assess}
          >
            Assess
          </button>
        ) : (
          <button
            onClick={props.assess}
            className={'btn btn-outline-success ' + styles.assess}
          >
            Assessed
          </button>
        )}
      </td>
    </tr>
  );
};

export default StudentCard;
