/* eslint-disable eqeqeq */
import * as actions from '../actions/actions';

const initialState = {
  members: [],
  currentMembers: [],
  memberError: null,
};

const fetchSuccess = (state, action) => {
  return {
    ...state,
    members: action.members,
  };
};

const fetchFail = (state, action) => {
  return {
    ...state,
    memberError: action.error,
  };
};

const fetchCurrentSuccess = (state, action) => {
  return {
    ...state,
    currentMembers: action.currentMembers,
  };
};

const fetchCurrentFail = (state, action) => {
  return {
    ...state,
    memberError: action.error,
  };
};

const deleteSuccess = (state, action) => {
  const newGroups = state.groups.filter((el) => el.id != action.id);
  console.log(newGroups);
  return {
    ...state,
    groups: newGroups,
  };
};

const deleteFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const createSuccess = (state, action) => {
  const newGroup = action.student;
  return {
    ...state,
    groups: state.groups.concat(newGroup),
  };
};

const createFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DELETE_GROUP_SUCCESS:
      return deleteSuccess(state, action);
    case actions.CREATE_GROUP_SUCCESS:
      return createSuccess(state, action);
    case actions.DELETE_GROUP_FAIL:
      return deleteFail(state, action);
    case actions.CREATE_GROUP_FAIL:
      return createFail(state, action);
    default:
      return state;
  }
};

export default groupReducer;
