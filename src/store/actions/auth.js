import axios from 'axios';
import * as actions from './actions';

const proxy = 'https://cors-anywhere.herokuapp.com/';
// const proxy = '';

const address =
  'http://ec2-13-211-29-46.ap-southeast-2.compute.amazonaws.com:8022/v1';

// const config = {
//   headers: {
//     Origin: 'http://localhost:3000',
//   },
// };

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
    console.log(data);
    const url = proxy + address + '/markers/register';
    axios
      .post(url, data)
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
    const url = proxy + address + '/markers/login';
    axios
      .post(url, data)
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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  return {
    type: actions.AUTH_LOGOUT,
  };
};
