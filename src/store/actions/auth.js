import * as actions from './actions';
import * as api from '../api';

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
    // console.log(data);
    api
      .signUp(data)
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);
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
      username: email,
      password,
    };
    api
      .login(data)
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);
        dispatch(authSuccess(response.token, response.id));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const onLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  return {
    type: actions.AUTH_LOGOUT,
  };
};
