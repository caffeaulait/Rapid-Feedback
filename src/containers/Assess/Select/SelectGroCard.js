import React from 'react';
import styles from './SelectGroCard.module.css';
import Table from 'react-bootstrap/Table'

const SelectGroCard = (props) => {

  let studentGroup = props.students.map(function (student, index) {
    return (
      <div style={{ marginTop: '3vh'}} key={index}>
        <Table responsive>
          <tbody>
            <tr>
              <td>{student.uni_student_number}</td>
              <td>{student.first_name + " " + student.last_name}</td>
            </tr>
          </tbody>
        </Table>
        {/* <ul className={styles.ull}>
          <li style={{ marginRight: '31vh' }}>{student.uni_student_number}</li>
          <li style={{ marginRight: '26vh' }}>{student.first_name + " " + student.last_name}</li>
        </ul> */}
      </div>

    );
  })

  let assess = props.students.slice(0,1).map(function (student, index) {
    return (
        <div>
        {student.is_assessed === 0 ? <button onClick={props.assess}>Assess</button> : "Assessed"}
        </div>
        
    );
  })

  return (
    <div >
      <div style={{ display: 'flex', border: '2px solid #003f8a', marginTop: '5vh'}}>
        <div style={{ marginTop: '10vh', marginBottom: '10vh', marginLeft: '5vh', marginRight: '20vh'}}>
          <h1>{"Group "+ props.groupid}</h1>
        </div>
        <Table responsive> 
            <tbody>
                <tr>
                {studentGroup}
                </tr>
            </tbody>
        </Table>
        <div>
            {assess}
        </div>
      </div>
    </div>


  );
}

export default SelectGroCard;