/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import styles from './Home.module.css';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Calendar from '../../assets/images/calendar.svg';
import Avatar from '../../assets/images/avatar.svg';
import Admin from '../../assets/images/admin.svg';
import Assess from '../../assets/images/assess.svg';
import Report from '../../assets/images/report.svg';
import { NavLink } from 'react-router-dom';
import * as format from '../../util/date';

class Home extends React.Component {
  componentDidMount() {
    // console.log(this.props);
  }

  onChangeAvatar = () => {
    console.log('change avatar');
  };

  goToAdmin = () => {
    this.props.history.push('/admin');
  };

  goToAssess = () => {
    this.props.history.push('/assess');
  };

  gotToReport = () => {
    this.props.history.push('/report');
  };

  render() {
    let admin = null;
    let assess = null;
    let review = null;
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    if (this.props.isCoordinator) {
      admin = (
        <div onClick={this.goToAdmin}>
          <img src={Admin} alt='admin'></img>
          <p>Administration</p>
        </div>
      );
    }

    assess = (
      <div onClick={this.goToAssess}>
        <img src={Assess} alt='assess'></img>
        <p>Real-time Assessment</p>
      </div>
    );
    if (this.props.isCoordinator) {
      review = (
        <div onClick={this.gotToReport}>
          <img src={Report} alt='report'></img>
          <p>Report</p>
        </div>
      );
    }

    let today = new Date();

    return (
      <Fragment>
        <Header></Header>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.box}>
              <div className={styles.fst}>
                <img
                  src={Calendar}
                  alt='calendar'
                  className={styles.calendar}
                ></img>
                <p>{format.formatDate(today)}</p>
              </div>
              <div className={styles.snd}>Sem 1 - Week 12 |</div>
            </div>
            <div className={styles.info}>
              <a alt='avatar' href='#' onClick={this.onChangeAvatar}>
                <img src={Avatar} alt='avatar' className={styles.avatar}></img>
              </a>
              <p className={styles.name}>
                Welcome, {this.props.firstName} {this.props.lastName}
              </p>
            </div>
            <div>
              <p>select one module to proceed</p>
              <NavLink to='/logout'>Sign out</NavLink>
            </div>
          </div>

          <div className={styles.right}>
            {admin}
            {assess}
            {review}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    isCoordinator: state.auth.isCoordinator,
  };
};

export default connect(mapStateToProps, null)(Home);
