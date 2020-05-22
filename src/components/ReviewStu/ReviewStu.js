import React from 'react';
import styles from './ReviewStu.module.css';
import Table from 'react-bootstrap/Table';

const ReviewStu = (props) => {



        return (
            <div >
            <Table responsive>
                <tbody>
                    <tr>
                    <td>{props.student.uni_student_number}</td>
                    <td>{props.student.first_name +" "+ props.student.last_name}</td>
                    <td>{props.student.is_assessed === 0 ? "assessment not started" : <button onClick={props.review} className={styles.review}>Review</button>}</td>
                        {/* <td>assessment not started</td>
                 
                        <td><button onClick={props.review} className={styles.review}>Review</button></td> */}
                    
                    </tr>
                </tbody>
            </Table>
          </div>


        );
}

export default ReviewStu;