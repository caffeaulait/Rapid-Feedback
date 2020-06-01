import * as actions from '../actions/actions';

const initialState = {
    comments: {},
    commentsError: null,
};

const fetchSuccess = (state, action) => {
    return {
        ...state,
        comments: action.comments,
    };
};

const fetchFail = (state, action) => {
    return {
        ...state,
        commentsError: action.error,
    };
};

const createSuccess = (state, action) => {
    const newComment = action.comment;
    let array = Object.assign({},state.comments);
    let dummy = state.comments[action.comment.criteria] == undefined ? []:state.comments[action.comment.criteria];
    dummy = dummy.concat(newComment);
    console.log(dummy);
    array[action.comment.criteria] = dummy
    console.log(array);
    return {
        ...state,
        comments: array,
    };
};

const createFail = (state, action) => {
    return {
        ...state,
        commentsError: action.error,
    };
};

const commReducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.GET_ALL_COMMENTS_SUCCESS:
        return fetchSuccess(state, action);
      case actions.CREATE_COMMENT_SUCCESS:
        return createSuccess(state, action);
      case actions.GET_ALL_COMMENTS_FAIL:
        return fetchFail(state, action);
      case actions.CREATE_COMMENT_FAIL:
        return createFail(state, action);
      default:
        return state;
    }
  };
  
  export default commReducer;
