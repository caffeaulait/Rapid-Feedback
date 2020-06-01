import React from 'react';
import styles from './Review.module.css';
import ProjectTab from './ProjectTab';
import CriteriaDetail from './CriteriaDetail';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/result';
import uuid from 'react-uuid';

class Review extends React.Component {
  state = {
    targetInfo: {
      targetName: '',
      students: [],
      subject: "",
      projectName: '',
      group: 0
    },
    markerInfo: {
      name: '',
      id: 0,
    },

    result: [
      { id: '1', point: 0, comment: '1', criteria: 'Voice, peace and confidence', weight: 10 },
      { id: '2', point: 5, comment: '2', criteria: 'Knowledge of Material', weight: 10 },
      { id: '3', point: 0, comment: '3', criteria: 'Content', weight: 10 },
      { id: '4', point: 5, comment: '4', criteria: 'Concluding remarks', weight: 10 },
      { id: '5', point: 0, comment: '5', criteria: 'PPT', weight: 10 },
    ],
    markers: [],
    backupresult: [
      {
        id: 1,
        result: [
          { id: '1', point: 0, comment: '1', criteria: 'Voice, peace and confidence', weight: 10 },
          { id: '2', point: 5, comment: '2', criteria: 'Knowledge of Material', weight: 10 },
          { id: '3', point: 0, comment: '3', criteria: 'Content', weight: 10 },
          { id: '4', point: 5, comment: '4', criteria: 'Concluding remarks', weight: 10 },
          { id: '5', point: 0, comment: '5', criteria: 'PPT', weight: 10 },
        ],
        assessDate: '08.2.2020',
      },
      {
        id: 2,
        result: [
          { id: '1', point: 0, comment: '1', criteria: 'Voice, peace and confidence', weight: 10 },
          { id: '2', point: 5, comment: '2', criteria: 'Knowledge of Material', weight: 10 },
          { id: '3', point: 0, comment: '3', criteria: 'Content', weight: 10 },
          { id: '4', point: 5, comment: '4', criteria: 'Concluding remarks', weight: 10 },
          { id: '5', point: 0, comment: '5', criteria: 'PPT', weight: 10 },
        ],
        assessDate: '23.8.2020',
      },
      {
        id: 3,
        result: [
          { id: '1', point: 0, comment: '1', criteria: 'Voice, peace and confidence', weight: 10 },
          { id: '2', point: 5, comment: '2', criteria: 'Knowledge of Material', weight: 10 },
          { id: '3', point: 0, comment: '3', criteria: 'Content', weight: 10 },
          { id: '4', point: 5, comment: '4', criteria: 'Concluding remarks', weight: 10 },
          { id: '5', point: 0, comment: '5', criteria: 'PPT', weight: 10 },
        ],
        assessDate: '25.12.2020',
      },
    ],
    assessDate: '08.2.2020',
  };

  componentDidMount() {
    console.log('fetching results........lalalalala');
    let pathArray = this.props.location.pathname.split("/");
    let array = [];
    let targetName = '';
    let group = null;
    if (pathArray[pathArray.length - 3] === "groups") {
      let gid = pathArray[pathArray.length - 2];
      let students = this.props.students.filter((student) => student.group_id == gid)
      array = students.map((s) => {
        return { name: s.first_name + " " + s.last_name, id: s.id }
      })
      group = gid
      targetName = "Group" + gid
    } else {
      let gid = 0;
      let students = this.props.students.filter((student) => student.id == pathArray[pathArray.length - 2])
      array = students.map((s) => {
        return { name: s.first_name + " " + s.last_name, id: s.id }
      })
      group = gid
      targetName = array[0].name
    }
    let pid = pathArray[pathArray.length - 4];
    let project = this.props.projects.filter((project) => project.id == pid)[0];

    this.setState({
      targetInfo: {
        targetName: targetName,
        students: array,
        subject: project.subject_name,
        projectName: project.proj_name,
        group: group
      }
    })

    let markers = this.props.backupresult.map((r) => (
      { id: r.markerId, name: r.results[0].firstName + " " + r.results[0].lastName }
    ))

    this.setState({ markers: markers, markerInfo: markers[0] })




    let backupResult = this.props.backupresult.map((r) => {
      let date = null;
      let result = r.results.map((s) => {
        date = new Date(s.assessedDate)
        return { id: s.criteriaId, point: s.score, comment: s.comment, criteria: s.criteria, weight: s.fullMark }
      })
      console.log(date)
      date = date.toLocaleDateString("en-GB");
      return { id: r.markerId, result: result, assessDate: date }
    })
    console.log("backupResult....");
    console.log(backupResult)
    this.setState({ backupresult: backupResult, assessDate: backupResult[0].assessDate, result: backupResult[0].result });








  }

  goBack = () => {
    this.props.history.goBack();
  };

  continue = () => {
    let url = this.props.match.url;
    let date = new Date();
    let assessedDate = date.toJSON();
    let pathArray = this.props.location.pathname.split("/");
    let pid = pathArray[pathArray.length - 4];
    let list = this.state.result.map((r) => {
      return {
        criteriaId: r.id,
        comment: r.comment,
        score: r.point
      }
    })

    let backupResult = this.props.backupresult.map((r) => {
      return r.markerId;
    })
    console.log(backupResult)

    let exist = backupResult.includes(this.props.markerId.toString());
    console.log(exist);
    let gid = this.state.targetInfo.group;
    let scoreGet = this.state.result.map(a => a.point).reduce((a, b) => a + b, 0);
    url = url.substring(0, url.length - 6) + 'report' + "?grades=" + scoreGet;
    this.state.targetInfo.students.map((m) => {
      if (exist) {
        this.props.upDateResults(
          this.props.markerId,
          pid,
          m.id,
          list,
          assessedDate,
          gid
        )
      } else {
        this.props.uploadResults(
          this.props.markerId,
          pid,
          m.id,
          list,
          assessedDate,
          gid)
      }
    })
    this.props.history.push(url);
  };

  setCurrentMarker = (e) => {
    if (e === this.props.markerId) {
      let d = new Date();

      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();

      var dateStr = d.toLocaleDateString("en-GB");
      this.setState({ assessDate: dateStr });
      let aggResult = [];
      this.state.result.forEach((r) => {
        let targetId = r.id;
        let record = { id: targetId, point: 0, comment: '', criteria: r.criteria, weight: r.weight };
        for (let i = 0; i < this.state.backupresult.length; i++) {
          console.log(this.state.backupresult[i]['assessDate']);
          let targetRecord = this.state.backupresult[i].result.filter(
            (r) => r.id === targetId
          );
          record.point += targetRecord[0].point;
          record.comment +=
            'Marker ' +
            Number(i + 1).toString() +
            '  Comments :\n' +
            targetRecord[0].comment;
          if (i !== this.state.backupresult.length - 1) {
            record.comment += '\n';
          }
        }
        record.point = record.point / this.state.backupresult.length;
        aggResult.push(record);
      });
      this.setState({
        result: aggResult,
        markerInfo: { name: this.props.markerName, id: this.props.markerId },
        assessDate: dateStr,
      });
      console.log(aggResult);
    } else {
      let marker = this.state.markers.filter((marker) => Number(marker.id) === Number(e));
      let id = marker[0].id;
      let target = this.state.backupresult.filter((result) => result.id == id);
      console.log(target);
      this.setState({
        markerInfo: { name: e, id: id },
        result: target[0].result,
        assessDate: target[0].assessDate,
      });
    }
  };

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
    let array = [...this.state.result];
    let index = null;
    for (let i = 0; i < array.length; i++) {
      if (Number(array[i].id) === Number(id)) {
        index = i;
        break
      }
    }

    console.log(index)

    // let copy = this.state.result.filter((item) => {
    //   return item.id != id;
    // });
    let target = this.state.result.filter((item) => {
      return item.id == id;
    });

    array[index] = { id: id, point: Number(value), comment: target[0].comment, criteria: target[0].criteria, weight: target[0].weight }


    // copy = [
    //   ...copy,
    //   { id: id, point: Number(value), comment: target[0].comment, criteria: target[0].criteria, weight: target[0].weight },
    // ];

    // targetMarker.result = copy;
    // console.log(targetMarker);
    //this.setState({ result: copy });
    this.setState({ result: array });
    // this.setState({backupresult:[...copyMarker, targetMarker]})
  };

  handleUpdateComments = (value, id, marker) => {
    //let copy = this.state.result.filter((item) => {
    //   return item.id != id;
    // });
    let array = [...this.state.result];
    let index = null;
    for (let i = 0; i < array.length; i++) {
      if (Number(array[i].id) === Number(id)) {
        index = i;
        break
      }
    }

    console.log(index)
    let target = this.state.result.filter((item) => {
      return item.id == id;
    });
    array[index] = { id: id, point: target[0].point, comment: value, criteria: target[0].criteria, weight: target[0].weight }
    //copy = [...copy, { id: id, point: target[0].point, comment: value, criteria: target[0].criteria, weight: target[0].weight }];
    this.setState({ result: array });
  };

  render() {
    if (!this.props.isAuthenticated || this.props.projects.length == 0) {
      this.props.history.replace('/login');
    }
    return (
      <div className={styles.outer}>
        <div className={styles.left}>
          <ProjectTab
            markers={this.state.markers}
            setMarker={this.setCurrentMarker}
            result={this.state.result}
            markerInfo={this.state.markerInfo}
            studentInfo={this.state.targetInfo}
            assessDate={this.state.assessDate}
            name={this.props.markerName}
            id={this.props.markerId}
          />
        </div>
        <div className={styles.right}>
          <p className={styles.assDetail}> Assessment Details: </p>
          <table className={styles.gradeTable}>
            <thead></thead>

            <tbody style={{ width: '100%' }}>
              <CriteriaDetail
                marker={this.state.markerInfo}
                id={this.props.markerId}
                result={this.state.result}
                updatePoint={this.handleUpdatePoint}
                updateComments={this.handleUpdateComments}
              />
            </tbody>
          </table>

          <div className={styles.btnGroup}>
            <button
              className={'btn btn-danger ' + styles.controlBtn}
              onClick={this.goBack}
            >
              Back
            </button>
            <button
              className={'btn btn-primary ' + styles.controlBtn}
              onClick={this.continue}
              disabled={this.state.markerInfo.id != this.props.markerId}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    backupresult: state.result.allResults,
    students: state.student.students,
    markerId: state.auth.uid,
    markerName: state.auth.firstName + " " + state.auth.lastName,
    projects: state.proj.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadResults: (mid, pid, sid, assessList, assessedDate, gid) => {
      dispatch(actions.onUploadResult(mid, pid, sid, assessList, assessedDate, gid))
    },
    upDateResults: (mid, pid, sid, assessList, assessedDate, gid) => {
      dispatch(actions.onUpdateResult(mid, pid, sid, assessList, assessedDate, gid))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);

