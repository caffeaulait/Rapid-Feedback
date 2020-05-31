import React from 'react';
import styles from './StudentCard.module.css';

const StudentCard = (props) => {
  return (
    <tr>
      <td>{props.student.uni_student_number}</td>
      <td>{props.student.first_name + ' ' + props.student.last_name}</td>
      <td>{props.student.uni_email}</td>
      <td>
        {props.student.isAssessed === 1 ? (
          <button
            onClick={props.review}
            className={'btn btn-outline-primary ' + styles.review}
          >
            Review
          </button>
        ) : (
          <button
            disabled
            className={'btn btn-outline-dark ' + styles.notAssed}
          >
            Not assessed
          </button>
        )}
      </td>
    </tr>
  );
};

export default StudentCard;
