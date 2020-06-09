/* eslint-disable eqeqeq */
import React from 'react';
import MarkingTitle from './MarkingTitle';
import MarkingList from './MarkingList';
import * as actions from '../../../store/actions/result';
import * as cactions from '../../../store/actions/criteria';
import { connect } from 'react-redux';

class GroupMarking extends React.Component {
  state = {
    assTarget: {
      groupName: 'Group2',
      Member: [
        { name: 'Alex', id: '123' },
        { name: 'Allen', id: '3455' },
        { name: 'Alice', id: '678' },
      ],
    },
    // assTarget: {Group: false,content: {name:"alice", number:"2324234"}}
    assTime: { min: 6, sec: 0 },
    // criteria: [{ id: "1", criteria: "Voice, peace and confidence", point: 10 },
    // { id: "2", criteria: "Knowledge of Material", point: 10 },
    // { id: "3", criteria: "Content", point: 10 },
    // { id: "4", criteria: "Concluding remarks", point: 10 },
    // { id: "5", criteria: "PPT", point: 10 }],
    // result: [{ id: "1", point: 0, comment: null },
    // { id: "2", point: 5, comment: null },
    // { id: "3", point: 0, comment: null },
    // { id: "4", point: 5, comment: null },
    // { id: "5", point: 0, comment: null }],
    projectId: '',
    markerId: '',

    minutes: 5,
    seconds: 0,

    selectedTarget: '',
    item: null,
    cid: ' ',
  };

  componentDidMount() {
    // console.log('fetching results........lalalalala');
    // this.props.fetchResult([{ id: "1", point: 0, comment: {} },
    // { id: "2", point: 5, comment: {} },
    // { id: "3", point: 0, comment: {} },
    // { id: "4", point: 5, comment: {} },
    // { id: "5", point: 0, comment: {} }]);
    console.log('fetching results........lalalalala');
    let pathArray = this.props.location.pathname.split('/');
    let gid = pathArray[pathArray.length - 1];
    let pid = pathArray[pathArray.length - 3];
    let project = this.props.projects.filter((p) => p.id == pid);
    let students = this.props.students.filter(
      (student) => student.group_id == gid
    );
    let array = students.map((s) => {
      return { name: s.first_name + ' ' + s.last_name, id: s.id };
    });
    let obj = { groupName: 'Group' + gid, Member: array };
    this.setState({ selectedTarget: 'Group' + gid });
    this.setState({ assTarget: obj });
    this.setState({ projectId: pid });
    this.setState({ markerId: this.props.markerId });
    this.setState({ minutes: Number(project[0].duration) });
    console.log('fetccriteria >>>>>>>');
    this.props.getCriterias(pid);

    console.log(this.props.location.pathname.split('/'));
    this.props.fetchResult(pid);
  }

  start = () => {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          window.confirm('Presentation time out!!!');
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  selectTarget = (target) => {
    this.setState({ selectedTarget: target });
  };

  updateItem = (content) => {
    this.setState({ item: content });
  };

  setCid = (id) => {
    this.setState({ cid: id });
  };

  goBack = () => {
    this.props.history.goBack();
    let pathArray = this.props.location.pathname.split('/');
    let pid = pathArray[pathArray.length - 3];
    this.props.fetchResult(pid);
  };

  addComments = () => {
    let target = this.props.result.filter((r) => r.id !== this.state.cid);
    let array = this.props.result.map((a) => a.id);
    var index = array.indexOf(this.state.cid);
    let change = this.props.result[index];
    let people = this.state.selectedTarget;
    console.log(people);
    change.comment[people] = this.state.item;
    this.props.updateResult([...target, change]);
    // this.setState({ result: [...target, change] })
  };

  handleUpdatePoint = (value, id) => {
    let copy = this.props.result.filter((item) => {
      return item.id != id;
    });
    let target = this.props.result.filter((item) => {
      return item.id == id;
    });
    copy = [
      ...copy,
      { id: id, point: Number(value), comment: target[0].comment },
    ];
    this.props.updateResult(copy);
    // this.setState({ result: copy })
  };

  commentConstructure = () => {
    // eslint-disable-next-line no-unused-vars
    let comment = '';
    for (var key in this.props.result.comments) {
      if (this.props.result.comments.hasOwnProperty(key)) {
        comment += key + ' : ' + this.props.result.comments[key].content + '\n';
        console.log(key + ' -> ' + this.props.result.comments[key]);
      }
    }
  };

  goBackToProject = () => {
    let date = new Date();
    let assessedDate = date.toJSON();
    const list = this.props.result.map((r) => {
      let commentsss = '';
      for (var key in r.comment) {
        if (r.comment.hasOwnProperty(key)) {
          commentsss += key + ' : ' + r.comment[key].content + '\n';
          console.log(key + ' -> ' + r.comment[key]);
        }
      }

      return {
        criteriaId: r.id,
        comment: commentsss,
        score: r.point,
      };
    });

    let pathArray = this.props.location.pathname.split('/');
    let gid = pathArray[pathArray.length - 1];
    let pid = pathArray[pathArray.length - 3];
    // eslint-disable-next-line array-callback-return
    this.state.assTarget.Member.map((m) => {
      this.props.uploadResults(
        this.state.markerId,
        this.state.projectId,
        m.id,
        list,
        assessedDate,
        gid
      );
    });

    this.props.fetchResult(pid);

    this.props.history.goBack();
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    return (
      <div>
        <MarkingTitle
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          start={this.start}
          assTarget={this.state.assTarget}
          assTime={this.state.assTime}
          result={this.props.result}
          criteria={this.props.criteria}
          setTarget={this.selectTarget}
        ></MarkingTitle>
        <MarkingList
          result={this.props.result}
          criteria={this.props.criteria}
          comments={this.state.comments}
          updatePoint={this.handleUpdatePoint}
          setId={this.setCid}
          addComments={this.addComments}
          updateItem={this.updateItem}
          target={this.state.selectedTarget}
          assTarget={this.state.assTarget}
        />
        <div
          style={{
            display: 'table',
            width: '100%',
            bottom: '0',
            textAlign: 'middle',
            marginTop: '2%',
          }}
        >
          <div
            style={{ display: 'table-cell', width: '45%', textAlign: 'center' }}
          >
            {' '}
            <button
              style={{
                position: 'relative',
                top: '50%',
                left: '50',
                fontSize: '20px',
                padding: '15px 25px',
                color: 'white',
                background: '#003F8A',
                borderRadius: '15px',
                width: '20%',
                verticalAlign: 'buttom',
              }}
              onClick={this.goBack}
            >
              Back
            </button>
          </div>
          <div
            style={{ display: 'table-cell', width: '45%', textAlign: 'center' }}
          >
            <button
              style={{
                position: 'relative',
                top: '50%',
                left: '50',
                fontSize: '20px',
                padding: '15px 25px',
                color: 'white',
                background: '#003F8A',
                borderRadius: '15px',
                width: '20%',
                verticalAlign: 'buttom',
              }}
              onClick={this.goBackToProject}
            >
              Confirm
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
    result: state.result.singleResult,
    students: state.student.students,
    markerId: state.auth.uid,
    criteria: state.criteria.criterias,
    projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResult: (array) => {
      dispatch(actions.onFetchGroupResult(array));
    },
    updateResult: (result) => {
      dispatch(actions.updateResultSuccess(result));
    },
    uploadResults: (mid, pid, sid, assessList, assessedDate, gid) => {
      dispatch(
        actions.onUploadResult(mid, pid, sid, assessList, assessedDate, gid)
      );
    },
    getCriterias: (pid) => {
      dispatch(cactions.onFetchCriterias(pid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMarking);
