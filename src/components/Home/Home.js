import React, { Fragment } from 'react';
import styles from './Home.module.css';
import { connect } from 'react-redux';
import Header from '../Header/Header';

class Home extends React.Component {
  render() {
    // if (!this.props.isAuthenticated) {
    //   this.props.history.push('/login');
    // }

    return (
      <Fragment>
        <Header></Header>
        <div className={styles.main}>
          <h1>This is the Home Page</h1>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, null)(Home);
