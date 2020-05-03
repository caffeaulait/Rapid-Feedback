import * as actions from '../actions/actions';

const initialState = {
  projects: [],
};

const projReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROJECT_LIST:
      return;
    default:
      return state;
  }
};

export default projReducer;
