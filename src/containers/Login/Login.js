import React, { Fragment } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/images/logo.jpg';

class Login extends React.Component {
  render() {
    return (
      <Fragment>
        <div className={styles.sidenav}></div>
        <div className={styles.main}>
          <img src={logo} alt='Logo' class={styles.logo} />
          <div className={styles.login_form}>
            <form>
              <div className='form-group'>
                <label>Username</label>
                <input type='text' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input type='password' className='form-control' />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                style={{ width: '140px' }}
              >
                Login
              </button>
              <button
                className='btn btn-outline-dark'
                style={{ float: 'right', width: '140px' }}
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
