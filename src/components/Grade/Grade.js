import React from 'react';
// eslint-disable-next-line no-unused-vars
import styles from './Grade.module.css';

const Grade = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.grade}</td>
      <td>{props.marker}</td>
      <td>{props.date}</td>
      <td>
        {/* <button
          onClick={props.goToView}
          className={'btn btn-outline-success ' + styles.viewBtn}
        >
          View
        </button> */}
      </td>
    </tr>
  );
};

export default Grade;
