import * as actions from '../actions/actions';

const initialState = {
  token: null,
  uid: null,
  error: null,
};

const authStart = (state, action) => {
  return state;
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    uid: action.uid,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default authReducer;
