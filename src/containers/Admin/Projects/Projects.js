import React from 'react';
import { connect } from 'react-redux';

class Projects extends React.Component {
  render() {
    let projects = <p style={{ textAlign: 'center' }}>No projects Avaiable</p>;
    if (!this.state) return <div>{projects}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onAuthenticate: (email, password) =>
    //   dispatch(auth.onLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
