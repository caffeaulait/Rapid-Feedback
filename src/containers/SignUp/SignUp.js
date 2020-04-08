import React from 'react';
import styles from './SignUp.module.css';
import logo from '../../assets/images/logo.jpg';
import { NavLink } from 'react-router-dom';

class SignUp extends React.Component {
  state = {
    firstName: '',
    LastName: '',
    password: '',
    confirm: '',
    email: '',
  };

  inputChange = (event) => {
    let type = event.target.name;
    this.setState({ [type]: event.target.value });
  };

  signUp = () => {};

  render() {
    return (
      <>
        <div className={styles.left_frame}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <div className={styles.app_name}>
            <p>Rapid Feedback</p>
            <p>For oral presentation</p>
          </div>
          <div className={styles.feature}>
            <p>Real-time Assessment</p>
            <p>Built-in Criteria and Rubic</p>
            <p>Comprehensive and Customoisable Comments</p>
            <p>Auto-generated Feedback Report</p>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.login_form}>
            <form onSubmit={this.signUp}>
              <div className='form-group'>
                <div style={{ float: 'left' }}>
                  <label>FirstName</label>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    value={this.state.firstName}
                    onChange={(event) => this.inputChange(event)}
                  />
                </div>
                <div style={{ float: 'right' }}>
                  <label>LastName</label>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    value={this.state.lastName}
                    onChange={(event) => this.inputChange(event)}
                  />
                </div>
              </div>
              <div style={{ clear: 'both' }}></div>
              {/* <div className='form-group'>
                <label>UserName</label>
                <input type='text' className='form-control' />
              </div> */}
              <div className='form-group'>
                <label>E-mail</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  value={this.state.email}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={this.state.password}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label>Confirm</label>
                <input
                  type='password'
                  className='form-control'
                  name='confirm'
                  value={this.state.confirm}
                  onChange={(event) => this.inputChange(event)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={this.state.password !== this.state.confirm}
              >
                Create an account
              </button>
              <small id='help' className='form-text text-muted'>
                Already have an account? <NavLink to='/login'>Sign In</NavLink>
              </small>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
