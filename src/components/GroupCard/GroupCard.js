import React from 'react';
import styles from './GroupCard.module.css';


const GroupCard = (props) => {

  let studentGroup = props.students.map(function (student, index) {
    return (
      <div style={{ marginTop: '3vh'}} key={index}>
        <ul className={styles.ull}>
          <li style={{ marginRight: '31vh' }}>{student.uni_student_number}</li>
          <li style={{ marginRight: '26vh' }}>{student.first_name + " " + student.last_name}</li>
        </ul>
      </div>

    );
  })

  return (
    <div >
      <div style={{ display: 'flex', border: '2px solid #003f8a', marginTop: '5vh' }}>
        <div style={{ margin: '10vh 5vh' }}>
          <h1>{"Group "+ props.groupid}</h1>
          <br />
          <li><button onClick={props.delete} className={styles.delete}>Delete</button></li>
        </div>
          <p style={{margin:'0 25vh'}}>Number</p>
          <p>Name</p>
        <div> {studentGroup}</div>
       
      </div>
    </div>


  );
}

export default GroupCard;