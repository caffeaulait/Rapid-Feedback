import React from 'react';
import styles from './SignUp.module.css';
import logo from '../../assets/images/logo.jpg';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as auth from '../../store/actions/auth';

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    confirm: '',
    email: '',
    staffId: '',
    isAdmin: false,
  };

  inputChange = (event) => {
    let type = event.target.name;
    const value =
      type === 'isAdmin' ? event.target.checked : event.target.value;
    this.setState({ [type]: value });
  };

  signUp = (event) => {
    event.preventDefault();
    // if (this.form.checkValidity() === false) event.stopPropagation();
    // else {
    this.form.classList.add('was-validated');
    if (this.form.checkValidity() === true) {
      const id = parseInt(this.state.staffId);
      this.props.onAuthenticate(
        id,
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.isAdmin
      );
    }
    // }
  };

  render() {
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to='/home' />;
    }
    // eslint-disable-next-line no-unused-vars
    const inValid =
      this.state.password === '' ||
      this.state.confirm === '' ||
      this.state.password !== this.state.confirm ||
      this.state.staffId === '' ||
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.email === '';

    return (
      <>
        {redirect}
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
            <form
              noValidate
              className='needs-validation'
              onSubmit={this.signUp}
              ref={(element) => (this.form = element)}
            >
              <div className='form-group'>
                <div style={{ float: 'left', width: '45%' }}>
                  <label>FirstName</label>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    value={this.state.firstName}
                    onChange={(event) => this.inputChange(event)}
                    placeholder='first name'
                    required
                  />
                  <div className='invalid-feedback'>
                    Please provide first name!
                  </div>
                </div>
                <div style={{ float: 'right', width: '45%' }}>
                  <label>LastName</label>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    value={this.state.lastName}
                    onChange={(event) => this.inputChange(event)}
                    placeholder='lastname'
                    required
                  />
                  <div className='invalid-feedback'>
                    Please provide last name!
                  </div>
                </div>
              </div>
              <div style={{ clear: 'both' }}></div>
              <div className='form-group'>
                <label>Staff Number</label>
                <input
                  type='text'
                  name='staffId'
                  value={this.state.staffId}
                  className='form-control'
                  onChange={(event) => this.inputChange(event)}
                  placeholder='staff number'
                  pattern='^\d+$'
                  required
                />
                <div className='invalid-feedback'>
                  Please provide valid staff number!
                </div>
              </div>
              <div className='form-group'>
                <label>E-mail</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  value={this.state.email}
                  onChange={(event) => this.inputChange(event)}
                  placeholder='email'
                  required
                />
                <div className='invalid-feedback'>
                  Please provide a valid email!
                </div>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={this.state.password}
                  onChange={(event) => this.inputChange(event)}
                  minLength='6'
                  maxLength='15'
                  placeholder='password'
                  required
                />
                <div className='invalid-feedback'>
                  A valid password must have at least 6 characters!
                </div>
              </div>
              <div className='form-group'>
                <label>Confirm</label>
                <input
                  type='password'
                  className='form-control'
                  name='confirm'
                  value={this.state.confirm}
                  onChange={(event) => this.inputChange(event)}
                  minLength='6'
                  maxLength='15'
                  placeholder='password'
                  required
                />
                <div
                  className='invalid-feedback'
                  style={{
                    display:
                      this.state.password === this.state.confirm
                        ? 'none'
                        : 'block',
                  }}
                >
                  Please repeat the same password!
                </div>
              </div>

              <div className='form-group'>
                <label>
                  <input
                    name='isAdmin'
                    type='checkbox'
                    checked={this.state.isCoordinator}
                    onChange={(event) => this.inputChange(event)}
                  />
                  &nbsp; I am subject Coordinator
                </label>
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (staffId, email, password, firstName, lastName, isAdmin) =>
      dispatch(
        auth.onSignUp(staffId, email, password, firstName, lastName, isAdmin)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
