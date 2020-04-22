import axios from 'axios';
import * as actions from './actions';

const API_KEY = 'AIzaSyDkfsypS-20fgShtdrQzWKSZZRKa3GaCZo';

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

export const onAuth = (email, password, isLogin) => {
  return (dispatch) => {
    dispatch(authStart);
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
