import React from 'react';
import './ProjectInfoCard.css';
class ProjectInforCard extends React.Component {


    render() {
        return (
            <div className="infoCard">
                <div className="title">
                    <h1 className="courseInfo">{this.props.project.subject_code+" "+this.props.project.subject_name}</h1>
                </div>
                <div className="line">
                    <label className="pLabel">Project Name:</label>
                    <div className="info" > {this.props.project.proj_name}</div>
                </div>
                <div className="line">
                    <label className="pLabel">Assessment Target:</label>
                    <div className="info" > {this.props.project.is_group === 1 ? "Group" : "Individual"}</div>
                </div>
                <div className="line">
                    <label className="pLabel">Assessment Duration:</label>
                    <div className="info" > {this.props.project.duration+" mins "}</div>
                </div>
                <div className="line">
                    <label className="pLabel">Created By:</label>
                    <div className="info" > {this.props.author}</div>
                </div>
            </div>
        );

    }
}

export default ProjectInforCard;