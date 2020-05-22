import React from 'react';
import styles from './ReviewGro.module.css';
import Table from 'react-bootstrap/Table'

const ReviewGroup = (props) => {

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

        <div style={{marginTop:'20vh'}}><button onClick={props.review} className={styles.review}>Review</button></div>
      </div>
    </div>


  );
}

export default ReviewGroup;