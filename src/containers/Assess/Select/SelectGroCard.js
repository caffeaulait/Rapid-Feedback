import React from 'react';
import styles from './SelectGroCard.module.css';
import Table from 'react-bootstrap/Table';

const SelectGroCard = (props) => {
  let studentNumber = props.students.map(function (student, index) {
    return (
      <tr>
        <td>{student.uni_student_number}</td>
      </tr>
    );
  });
  let studentName = props.students.map(function (student, index) {
    return (
      <tr>
        <td>{student.first_name + ' ' + student.last_name}</td>
      </tr>
    );
  });

  let assess = props.students.slice(0, 1).map(function (student, index) {
    return (
      <td>
        {student.is_assessed === 0 ? (
          <button onClick={props.assess}>Assess</button>
        ) : (
          <button onClick={props.assessed}>Assessed</button>
        )}
      </td>
    );
  });

  return (
    // <div >
    //   <div style={{ display: 'flex', border: '2px solid #003f8a', marginTop: '5vh'}}>
    //     <div style={{ marginTop: '10vh', marginBottom: '10vh', marginLeft: '5vh', marginRight: '20vh'}}>
    //       <h1>{"Group "+ props.groupid}</h1>
    //     </div>
    //     <Table responsive>
    //         <tbody>
    //             <tr>
    //             {studentGroup}
    //             </tr>
    //         </tbody>
    //     </Table>
    //     <div>
    //         {assess}
    //     </div>
    //   </div>
    // </div>
    <tr>
      <td>{'Group ' + props.groupid}</td>
      <td>{studentNumber}</td>
      <td>{studentName}</td>
      <td>{assess}</td>
    </tr>
  );
};

export default SelectGroCard;
