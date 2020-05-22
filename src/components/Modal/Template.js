import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import template from '../../assets/images/template.jpg';
// import styles from './Template.module.css';

const Template = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      //   dialogClassName={styles.customModal}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Template for importing students from excel or csv files
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <img
          src={template}
          alt='template file'
        ></img> */}
        <table>
          <thead>
            <tr>
              <td>Student Number</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>111111</td>
              <td>David</td>
              <td>Smith</td>
              <td>david@student.unimelb.edu.au</td>
            </tr>
            <tr>
              <td>222222</td>
              <td>James</td>
              <td>Wang</td>
              <td>james@student.unimelb.edu.au</td>
            </tr>
            <tr>
              <td>333333</td>
              <td>Victor</td>
              <td>Hanson</td>
              <td>victor@student.unimelb.edu.au</td>
            </tr>
            <tr>
              <td>444444</td>
              <td>Chloe</td>
              <td>Huang</td>
              <td>chole@student.unimelb.edu.au</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Template;
