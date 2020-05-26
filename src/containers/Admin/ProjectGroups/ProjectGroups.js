import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as studentActions from '../../../store/actions/student';
import * as groupActions from '../../../store/actions/group';
import GroupCard from '../../../components/GroupCard/GroupCard';
import styles from './ProjectGroups.module.css';

class ProjectGroups extends React.Component {
  state = {
    projectid: null,
  };

  groupBy = (xs, key) => {
    let obj = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
    const results = [];
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        results.push({ group_id: k, students: obj[k] });
      }
    }
    return results.sort((a, b) => a.group_id < b.group_id);
  };

  componentDidMount() {
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    if (this.props.students.length === 0) {
      console.log('fetching students');
      this.props.fetchStudents(proid);
    }
  }

  goToAddGroup = () => {
    let path = this.props.location.pathname;
    this.props.history.push(path + '/add');
  };

  deleteGroup = (groupId) => {
    this.props.deleteGroup(this.state.projectid, groupId);
  };

  render() {
    let studentGroups = [];
    const groupedStudents = this.props.students.filter(
      (student) => student.group_id !== 0
    );
    // eslint-disable-next-line no-unused-vars
    const unGroupedStudents = this.props.students.filter(
      (student) => student.group_id === 0
    );

    studentGroups = this.groupBy(groupedStudents, 'group_id');
    let content = null;
    content = studentGroups.map((el) => {
      return (
        <GroupCard
          students={el.students}
          groupid={el.group_id}
          key={el.group_id}
          delete={() => this.deleteGroup(el.group_id)}
        ></GroupCard>
      );
    });
    return (
      <div>
        <div>
          <button
            onClick={this.goToAddGroup}
            className={'btn btn-primary ' + styles.addBtn}
          >
            Create Group
          </button>
          <div style={{ clear: 'both' }}></div>
        </div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(studentActions.onFetchStudents(pid));
    },
    deleteGroup: (pid, gid) => {
      dispatch(groupActions.onDeleteGroup(pid, gid));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectGroups)
);
