import React from 'react';
import ReactDom from 'react-dom';

const projectInfoCard = () => {
  return (
    <div className='projectcard'>
      <div className='subjectInfo'>
        <h1>COMP90082 Software Project</h1>
      </div>
      <div className='extraContent'>
        <div className='projectName'>
          <label>Project Name:</label>
          <p className='pName'>Apollo Program</p>
        </div>
        <div className='Assessmemt Target'>
          <label>Assessment Target:</label>
          <p className='assTarget'>Individual</p>
        </div>
        <div className='Assessmemt Duration'>
          <label>Assessmemt Duration:</label>
          <p className='assDur'>5 minutes</p>
        </div>
        <div className='Created By'>
          <label>Created By:</label>
          <p className='author'>Prof.xxx</p>
        </div>
      </div>
    </div>
  );
};
