import axios from 'axios';
import * as actions from './actions';

// const API_KEY = 'AIzaSyDkfsypS-20fgShtdrQzWKSZZRKa3GaCZo';

export const authStart = () => {
  return { type: actions.AUTH_START };
};

export const authSuccess = (token, uid) => {
  return {
    type: actions.AUTH_SUCCESS,
    token,
    uid,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error,
  };
};

export const onSignUp = (
  staffId,
  email,
  password,
  firstName,
  lastName,
  isAdmin
) => {
  return (dispatch) => {
    dispatch(authStart);
    const data = {
      uni_id: staffId,
      first_name: firstName,
      last_name: lastName,
      uni_email: email,
      password,
      is_coordinator: isAdmin ? 1 : 0,
    };
    const url = '172.16.0.119:8099/v1/markers/register';
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.token, response.id));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const onLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart);
    const data = {
      uni_email: email,
      password,
    };
    const url = '172.16.0.119:8099/v1/markers/login';
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.token, response.id));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
