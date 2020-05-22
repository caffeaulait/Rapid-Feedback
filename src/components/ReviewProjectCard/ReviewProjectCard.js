import React from 'react';

const ReviewProjectCard = (props) => {

    
      return (
        <div >
            <div>
                {/* <h1 style={{marginBottom:'5vh'}}>Current Project:</h1>
                <h2 style={{marginBottom:'10vh', color:'black'}}>{props.project.subject_code +" "+ props.project.proj_name}</h2> */}
                <ul>
                    {/* <li style={{fontWeight: "bold", borderBottom: '2px solid #cccccc'}}>Comp90082 Assignment1</li> */}
                    <li onClick={props.review}>{props.project.subject_code +" "+ props.project.proj_name}</li>
                </ul>
            </div>
        
        </div>
      );
}

export default ReviewProjectCard;