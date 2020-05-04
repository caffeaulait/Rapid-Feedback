import * as actions from './actions';
import * as api from '../api';

export const authStart = () => {
  return { type: actions.AUTH_START };
};

export const authSuccess = (token, uid, lastName, isCoordinator) => {
  return {
    type: actions.AUTH_SUCCESS,
    token,
    uid,
    lastName,
    isCoordinator,
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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        dispatch(
          authSuccess(
            response.data.token,
            response.data.id,
            response.daat.last_name,
            response.data.is_coordinator
          )
        );
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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        dispatch(
          authSuccess(
            response.data.token,
            response.data.id,
            response.data.last_name,
            response.data.is_coordinator
          )
        );
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
