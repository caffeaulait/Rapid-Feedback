import React from 'react';
import { connect } from 'react-redux';
import * as actions1 from '../../../store/actions/group';
import * as actions2 from '../../../store/actions/student';
import styles from './Groups.module.css';
import Students from '../Students/Students';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import ProjectGroups from '../ProjectGroups/ProjectGroups';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectid: null,
      show: false,
    };
  }
  componentWillMount() {
    this.props.clearStudents();
  }

  componentDidMount() {
    const proid = this.props.match.params.pid;
    this.setState({ projectid: proid });
    console.log('fetching students');
    this.props.fetchStudents(proid);
  }

  goBack = () => {
    this.props.history.goBack();
  };

  delStudent = (pid, sid) => {
    this.props.deleteStudent(pid, sid);
  };

  deleteGroup = (pid, gid) => {
    this.props.deleteGroup(pid, gid);
  };

  render() {
    return (
      <div className={styles.outer}>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Row>
            <Col sm={2}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first'>Students</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>Groups</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <Students isGroup='true' />
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <ProjectGroups />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    students: state.student.students,
    // projectid:state.projectid
    // projects: state.proj.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (pid) => {
      dispatch(actions2.onFetchStudents(pid));
    },
    deleteStudent: (pid, sid) => {
      dispatch(actions2.onDeleteStudent(pid, sid));
    },
    deleteGroup: (pid, gid) => {
      dispatch(actions1.onDeleteGroup(pid, gid));
    },
    importStudents: (pid, students) => {
      dispatch(actions2.onImportStudents(pid, students));
    },
    clearStudents: () => {
      dispatch(actions2.onClearStudents());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
