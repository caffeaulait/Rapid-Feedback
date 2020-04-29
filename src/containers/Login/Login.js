import React from 'react';
import styles from './Login.module.css';
import logo from '../../assets/images/logo.jpg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as auth from '../../store/actions/auth';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  inputChange = (event) => {
    let type = event.target.name;
    this.setState({ [type]: event.target.value });
  };

  login = (event) => {
    event.preventDefault();
    this.props.onAuthenticate(this.state.email, this.state.password, true);
  };

  goToSignUp = () => {
    this.props.history.push('/signup');
  };
  render() {
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to='/home' />;
    }
    return (
      <>
        {redirect}
        <div className={styles.left_frame}></div>
        <div className={styles.main}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <div className={styles.login_form}>
            <form onSubmit={this.login}>
              {/* <div className='form-group'>
                <label>Username</label>
                <input type='text' className='form-control' />
              </div> */}
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='text'
                  className='form-control'
                  name='email'
                  value={this.state.email}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  value={this.state.password}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                style={{ width: '40%' }}
              >
                Login
              </button>
              <button
                onClick={this.goToSignUp}
                className='btn btn-outline-dark'
                style={{ float: 'right', width: '40%' }}
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password) =>
      dispatch(auth.onLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
