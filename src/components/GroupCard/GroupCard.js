import React from 'react';
import styles from './GroupCard.module.css';
import Table from 'react-bootstrap/Table'

const GroupCard = (props) => {

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

  return (
    <div >
      <div style={{ display: 'flex', border: '2px solid #003f8a', marginTop: '5vh'}}>
        <div style={{ marginTop: '10vh', marginBottom: '10vh', marginLeft: '5vh', marginRight: '20vh'}}>
          <h1>{"Group "+ props.groupid}</h1>
          <br />
          <li><button onClick={props.delete} className={styles.delete}>Delete</button></li>
        </div>

      
          <Table responsive> 
            <tbody>
              <tr>
                {studentGroup}
              </tr>
            </tbody>
          </Table>
          {/* <p style={{margin:'0 25vh'}}>Number</p>
          <p>Name</p> */}
        {/* <div> {studentGroup}</div> */}
       
      </div>
    </div>


  );
}

export default GroupCard;