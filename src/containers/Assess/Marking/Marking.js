import React from 'react';
import MarkingTitle from "./MarkingTitle";
import MarkingList from './MarkingList';
import * as actions from '../../../store/actions/result';
import * as cactions from '../../../store/actions/criteria';
import { connect } from 'react-redux';
import { IMPORT_STUDENTS_FAIL } from '../../../store/actions/actions';
import { uploadResults, getCriterias } from '../../../store/api';

class Marking extends React.Component {

    state = {
        assTarget: { name: "", number: "", studentId: "" },
        assTime: { min: 10, sec: 0 },
        // result: [{ id: "1", point: 0, comment: '1' },
        // { id: "2", point: 5, comment: '2' },
        // { id: "3", point: 0, comment: '3' },
        // { id: "4", point: 5, comment: '4' },
        // { id: "5", point: 0, comment: '5' }],
        projectId: "",
        markerId: "",

        minutes: 5,
        seconds: 0,


        item: '',
        cid: " ",


    }

    componentDidMount() {
        console.log('fetching results........lalalalala');
        let pathArray = this.props.location.pathname.split("/");
        let id = pathArray[pathArray.length - 1];
        let pid = pathArray[pathArray.length - 3];
        let project = this.props.projects.filter((p) => p.id == pid)
        console.log(project[0].duration)
        let s = this.props.students.filter((student) => student.id == id)[0]
        this.setState({ assTarget: { name: s.first_name + " " + s.last_name, number: s.uni_student_number, studentId: id } , assTime: {min: Number(project[0].duration), sec: 0}})
        this.setState({ projectId: pid });
        this.setState({ markerId: this.props.markerId });
        this.setState({ minutes: Number(project[0].duration) })
        console.log('fetccriteria >>>>>>>');
        this.props.getCriterias(pid);

        console.log(this.props.location.pathname.split("/"));
        this.props.fetchResult(pid);

    }

    start = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    window.confirm('Presentation time out!!!')
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }




    updateItem = (content) => {
        this.setState({ item: content });
    }

    setCid = (id) => {
        this.setState({ cid: id });
    }

    goBack = () => {
        this.props.history.goBack();
        let pathArray = this.props.location.pathname.split("/");
        let pid = pathArray[pathArray.length - 3];
        this.props.fetchResult(pid);
    };

    addComments = () => {
        let target = this.props.result.filter((r) => r.id !== this.state.cid);
        let array = this.props.result.map(a => a.id);
        var index = array.indexOf(this.state.cid);
        let change = this.props.result[index];
        change.comment = this.state.item;
        this.props.updateResult([...target, change])
        // this.setState({ result: [...target, change] })
    }


    handleUpdatePoint = (value, id) => {
        let copy = this.props.result.filter((item) => {
            return item.id != id;
        });
        let target = this.props.result.filter((item) => {
            return item.id == id;
        });
        copy = [...copy, { id: id, point: Number(value), comment: target[0].comment }];
        this.props.updateResult(copy)
        // this.setState({ result: copy })

    }

    goBackToProject = () => {
        let date = new Date();
        let assessedDate = date.toJSON();
        const list = this.props.result.map(
            (r) => 
             ({
                criteriaId: r.id,
                comment:r.comment,
                score: r.point
            })
        );
        this.props.uploadResults(
            this.state.markerId,
            this.state.projectId,
            this.state.assTarget.studentId,
            list,
            assessedDate,
            0)

            let pathArray = this.props.location.pathname.split("/");
        let pid = pathArray[pathArray.length - 3];
        this.props.fetchResult(pid);

        

        this.props.history.goBack();

    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

render() {
    if (!this.props.isAuthenticated) {
        this.props.history.replace('/login');
    }
    return (
        <div>
            <MarkingTitle minutes = {this.state.minutes} seconds = {this.state.seconds} start = {this.start} assTarget={this.state.assTarget} assTime={this.state.assTime} result={this.props.result} criteria={this.props.criteria}></MarkingTitle>
            <MarkingList result={this.props.result} criteria={this.props.criteria} comments={this.state.comments} updatePoint={this.handleUpdatePoint} setId={this.setCid} addComments={this.addComments} updateItem={this.updateItem} />
            <div style={{ display: "table", width: "100%", bottom: "0", textAlign: "middle", marginTop: "2%" }}>
                <div style={{ display: "table-cell", width: "45%", textAlign: "center" }}> <button style={{ position: "relative", top: "50%", left: "50", fontSize: '20px', padding: '15px 25px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'buttom' }} onClick={this.goBack} >Back</button></div>
                <div style={{ display: "table-cell", width: "45%", textAlign: "center" }}><button style={{ position: "relative", top: "50%", left: "50", fontSize: '20px', padding: '15px 25px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'buttom' }} onClick={this.goBackToProject}>Confirm</button></div>
            </div>
        </div>

    )
}
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        result: state.result.singleResult,
        students: state.student.students,
        markerId: state.auth.uid,
        criteria: state.criteria.criterias,
        projects: state.proj.projects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchResult: (array) => {
            dispatch(actions.onFetchResult(array));
        },
        updateResult: (result) => {
            dispatch(actions.updateResultSuccess(result))
        },
        uploadResults: (mid, pid, sid, assessList, assessedDate, gid) => {
            dispatch(actions.onUploadResult(mid, pid, sid, assessList, assessedDate, gid))
        },
        getCriterias: (pid) => {
            dispatch(cactions.onFetchCriterias(pid))
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marking);