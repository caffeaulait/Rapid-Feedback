import * as actions from '../actions/actions';

const initialState = {
  projects: [],
};

const fetchSuccess = (state, action) => {
  return {
    ...state,
    projects: action.projects,
  };
};

const projReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROJECT_LIST:
      return fetchSuccess(state, action);
    default:
      return state;
  }
};

export default projReducer;
