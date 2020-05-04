import React from 'react';

const Project = (props) => {
  return (
    <div>
      <p>{props.project.projectName}</p>
      <p>Posted by: {props.project.subjectName}</p>
    </div>
  );
};

export default Project;
