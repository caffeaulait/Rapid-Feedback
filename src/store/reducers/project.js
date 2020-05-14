/* eslint-disable eqeqeq */
import * as actions from '../actions/actions';

const initialState = {
  projects: [],
  projError: null,
};

const fetchSuccess = (state, action) => {
  return {
    ...state,
    projects: action.projects,
  };
};

const fetchFail = (state, action) => {
  return {
    ...state,
    projError: action.error,
  };
};

const deleteSuccess = (state, action) => {
  const newProjects = state.projects.filter((el) => el.id != action.id);
  console.log(newProjects);
  return {
    ...state,
    projects: newProjects,
  };
};

const deleteFail = (state, action) => {
  return {
    ...state,
    projError: action.error,
  };
};

const createSuccess = (state, action) => {
  const newProject = action.project;
  return {
    ...state,
    projects: state.projects.concat(newProject),
  };
};

const createFail = (state, action) => {
  return {
    ...state,
    projError: action.error,
  };
};

const updateSucess = (state, action) => {
  const copy = [...state.projects];
  const index = copy.findIndex((el) => el.id == action.project.id);
  copy[index] = action.project;
  return {
    ...state,
    projects: copy,
  };
};

const updateFail = (state, action) => {
  return {
    ...state,
    projError: action.error,
  };
};

const projReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROJECT_LIST_SUCCESS:
      return fetchSuccess(state, action);
    case actions.DELETE_PROJECT_SUCCESS:
      return deleteSuccess(state, action);
    case actions.CREATE_PROJECT_SUCCESS:
      return createSuccess(state, action);
    case actions.UPDATE_PROJECT_SUCCESS:
      return updateSucess(state, action);
    case actions.GET_PROJECT_LIST_FAIL:
      return fetchFail(state, action);
    case actions.DELETE_PROJECT_FAIL:
      return deleteFail(state, action);
    case actions.CREATE_PROJECT_FAIL:
      return createFail(state, action);
    case actions.UPDATE_PROJECT_FAIL:
      return updateFail(state, action);
    default:
      return state;
  }
};

export default projReducer;
