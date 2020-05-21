import React from 'react';
import styles from './Review.module.css';
import ProjectTab from './ProjectTab';
import CriteriaDetail from './CriteriaDetail';

export default class Review extends React.Component {

    state = {
        studentInfo: {
            studentName: "Claire Huang",
            studentId: "99999",
            subject: "COMP90082 Software Project",
            projectName: "xxx Application",
        },
        markerInfo: {
            name: "Course Coordinator"
        },
        criteria: [{ id: "1", criteria: "Voice, peace and confidence", point: 10 },
        { id: "2", criteria: "Knowledge of Material", point: 10 },
        { id: "3", criteria: "Content", point: 10 },
        { id: "4", criteria: "Concluding remarks", point: 10 },
        { id: "5", criteria: "PPT", point: 10 }],
        result: [{ id: "1", point: 0, comment: '1' },
        { id: "2", point: 5, comment: '2' },
        { id: "3", point: 0, comment: '3' },
        { id: "4", point: 5, comment: '4' },
        { id: "5", point: 0, comment: '5' }],
        assessDate: "",
    }

    componentDidMount() {

        let d = new Date();

        let date = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();

        var dateStr = date + "/" + month + "/" + year;
        this.setState({ assessDate: dateStr });


    }

    handleUpdatePoint = (value, id) => {

        let copy = this.state.result.filter((item) => {
            return item.id != id;
        });
        let target = this.state.result.filter((item) => {
            return item.id == id;
        });
        copy = [...copy, { id: id, point: Number(value), comment: target[0].comment }];
        this.setState({ result: copy })

    }

    handleUpdateComments = (value, id) => {
        let copy = this.state.result.filter((item) => {
            return item.id != id;
        });
        let target = this.state.result.filter((item) => {
            return item.id == id;
        });
        copy = [...copy, { id: id, point: target[0].point, comment: value }];
        this.setState({ result: copy })
    }






    render() {
        return (
            <div className={styles.outer}>
                <div className={styles.left}><ProjectTab criteria={this.state.criteria} result={this.state.result} markerInfo={this.state.markerInfo} studentInfo={this.state.studentInfo} assessDate={this.state.assessDate} /></div>
                <div className={styles.right}>
                    <p className={styles.assDetail}> Assessment Details: </p>
                    <table className={styles.gradeTable}>
                        <thead>
                        </thead>
                        <tbody><CriteriaDetail criteria={this.state.criteria} result={this.state.result} updatePoint={this.handleUpdatePoint} updateComments={this.handleUpdateComments} /></tbody>
                    </table>

                    <div className={styles.btnGroup}>
                        <button className={'btn btn-danger ' + styles.controlBtn}>
                            Back
                </button>
                        <button className={'btn btn-primary ' + styles.controlBtn}>
                            Continue
                </button>
                    </div>
                </div>
            </div>
        )
    }
}