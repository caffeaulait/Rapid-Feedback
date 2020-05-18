import React from 'react';
import styles from './StudentCard.module.css';
import Table from 'react-bootstrap/Table';

const StudentCard = (props) => {



        return (
            <div >
                {/* <ul className = {styles.ull}>
                    <li style={{marginRight:'32vh'}}>{props.student.uni_student_number}</li>
                    <li style={{marginRight:'26vh'}}>{props.student.first_name +" "+ props.student.last_name}</li>
                    <li>{props.student.uni_email}</li>
                    <li><button onClick={props.delete} className={styles.delete}>Delete</button></li>
                </ul> */}
            <Table responsive>
                <tbody>
                    <tr>
                    <td>{props.student.uni_student_number}</td>
                    <td>{props.student.first_name +" "+ props.student.last_name}</td>
                    <td>{props.student.uni_email}</td>
                    <td><button onClick={props.delete} className={styles.delete}>Delete</button></td>
                   
                    </tr>
                </tbody>
                </Table>
          </div>


        );
}

export default StudentCard;