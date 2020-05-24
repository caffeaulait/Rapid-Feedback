import React from 'react';
import styles from './Review.module.css';
import ProjectTab from './ProjectTab';
import CriteriaDetail from './CriteriaDetail';
import ScrollArea from 'react-scrollbar';
import { ThemeConsumer } from 'styled-components';

export default class Review extends React.Component {

    state = {
        studentInfo: {
            studentName: "Claire Huang",
            studentId: "99999",
            subject: "COMP90082 Software Project",
            projectName: "xxx Application",
        },
        markerInfo: {
            name: "john",
            id : 1
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
        markers: [{ id: 1, name: "john" }, { id: 2, name: "alex" }, { id: 3, name: "wall" }],
        backupresult: [
            {
                id: 1, result: [{ id: "1", point: 0, comment: '1' },
                { id: "2", point: 1, comment: '2' },
                { id: "3", point: 2, comment: '3' },
                { id: "4", point: 5, comment: '4' },
                { id: "5", point: 5, comment: '5' }], assessDate: "08.2.2020"
            },
            {
                id: 2, result: [{ id: "1", point: 0, comment: '13434' },
                { id: "2", point: 5, comment: '2434' },
                { id: "3", point: 8, comment: '343' },
                { id: "4", point: 5, comment: '4343' },
                { id: "5", point: 10, comment: '54343' }], assessDate: "23.8.2020"
            },
            {
                id: 3, result: [{ id: "1", point: 0, comment: '1grg' },
                { id: "2", point: 5, comment: '2ghgh' },
                { id: "3", point: 5, comment: '3hg' },
                { id: "4", point: 3, comment: '4hgh' },
                { id: "5", point: 7, comment: '5ghgh' }], assessDate: "25.12.2020"
            },
        ],
        assessDate: "08.2.2020",
    }

    componentDidMount() {

        // let d = new Date();

        // let date = d.getDate();
        // let month = d.getMonth() + 1;
        // let year = d.getFullYear();

        // var dateStr = date + "/" + month + "/" + year;
        // this.setState({ assessDate: dateStr});


    }

    setCurrentMarker = (e) => {
        if (e === "Course Coordinator") {
            let d = new Date();

            let date = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();

            var dateStr = date + "." + month + "." + year;
            this.setState({ assessDate: dateStr });
            let aggResult = [];
            this.state.result.forEach((r) => {
                let targetId = r.id;
                let record = { id: targetId, point: 0, comment: "" };
                for (let i = 0; i < this.state.backupresult.length; i++) {
                    console.log(this.state.backupresult[i]['assessDate']);
                    let targetRecord = this.state.backupresult[i].result.filter((r) => r.id === targetId);
                    record.point += targetRecord[0].point;
                    record.comment += "Marker " + Number(i + 1).toString() + ":" + targetRecord[0].comment;
                    if (i !== this.state.backupresult.length - 1) {
                        record.comment += "\n"
                    }
                }
                record.point = record.point / this.state.backupresult.length;
                aggResult.push(record);
            })
            this.setState({ result: aggResult, markerInfo: { name: "Course Coordinator", id:null }, assessDate: dateStr })
            console.log(aggResult);
        } else {
            let marker = this.state.markers.filter((marker) => marker.name === e);
            let id = marker[0].id;
            let target = this.state.backupresult.filter((result) => result.id == id);
            console.log(target)
            this.setState({ markerInfo: { name: e, id:id }, result: target[0].result, assessDate: target[0].assessDate });
        }

    }

    handleUpdatePoint = (value, id, markerId) => {
        // let markerId = marker.id;
       
        // let copyMarker =  this.state.backupresult.filter((r) => {
        //     return r.id != markerId;
        // })
        // console.log("copy marker");
        // console.log(copyMarker);
        // let targetMarker = this.state.backupresult.filter((r) => {
        //     return r.id == markerId;
        // })
        // console.log("current marker");
        // console.log(targetMarker);



        let copy = this.state.result.filter((item) => {
            return item.id != id;
        });
        let target = this.state.result.filter((item) => {
            return item.id == id;
        });
        copy = [...copy, { id: id, point: Number(value), comment: target[0].comment }];

        // targetMarker.result = copy;
        // console.log(targetMarker);
        this.setState({ result: copy })
        // this.setState({backupresult:[...copyMarker, targetMarker]})

    }

    handleUpdateComments = (value, id, marker) => {
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
                <div className={styles.left}><ProjectTab markers={this.state.markers} setMarker={this.setCurrentMarker} criteria={this.state.criteria} result={this.state.result} markerInfo={this.state.markerInfo} studentInfo={this.state.studentInfo} assessDate={this.state.assessDate} /></div>
                <div className={styles.right}>
                    <p className={styles.assDetail}> Assessment Details: </p>
                    <table className={styles.gradeTable}>
                        <thead>
                        </thead>

                        <tbody style={{ width: "100%" }}><CriteriaDetail marker = {this.state.markerInfo} criteria={this.state.criteria} result={this.state.result} updatePoint={this.handleUpdatePoint} updateComments={this.handleUpdateComments} /></tbody>

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