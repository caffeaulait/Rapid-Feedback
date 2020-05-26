import React from 'react';


const ReviewStuCard = (props) => {

        return (
          <tr>
            <td>{props.student.uni_student_number}</td>
            <td>{props.student.first_name +" "+ props.student.last_name}</td>
            <td>{props.student.uni_email}</td>
            <td>{props.student.is_assessed === 0 ? <button onClick={props.assess}>Not Assess</button> : <button onClick={props.assessed}>Review</button>}</td>
          </tr>
        );
}

export default ReviewStuCard;