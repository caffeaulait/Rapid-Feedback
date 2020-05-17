import React from 'react';
import styles from './StudentCard.module.css';
import ListGroup from 'react-bootstrap/ListGroup'


const StudentCard = (props) => {



        return (
            <div >
                <ul className = {styles.ull}>
                    <li style={{marginRight:'32vh'}}>{props.student.uni_student_number}</li>
                    <li style={{marginRight:'26vh'}}>{props.student.first_name +" "+ props.student.last_name}</li>
                    <li>{props.student.uni_email}</li>
                    <li><button onClick={props.delete} className={styles.delete}>Delete</button></li>
                </ul>
            {/* <ListGroup horizontal>
                <ListGroup.Item className = {styles.qq}>{props.student.uni_student_number}</ListGroup.Item>
                <ListGroup.Item className = {styles.qq}>{props.student.first_name +" "+ props.student.last_name}</ListGroup.Item>
                <ListGroup.Item className = {styles.qq}>{props.student.uni_email}</ListGroup.Item>
                <ListGroup.Item className = {styles.qq}><button onClick={props.delete} className={styles.delete}>Delete</button></ListGroup.Item>
            </ListGroup> */}
          </div>


        );
}

export default StudentCard;