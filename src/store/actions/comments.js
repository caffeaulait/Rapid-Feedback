import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (comments) => {
  console.log(comments);
  return {
    type: actions.GET_ALL_COMMENTS_SUCCESS,
    comments: comments,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_ALL_COMMENTS_FAIL,
    error,
  };
};

export const createSuccess = (comment) => {
  return {
    type: actions.CREATE_COMMENT_SUCCESS,
    comment,
  };
};

export const createFail = (error) => {
  return {
    type: actions.CREATE_COMMENT_FAIL,
    error,
  };
};

function groupBy(xs, f) {
  return xs.reduce(
    // eslint-disable-next-line no-sequences
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
}

export const onFetchComments = (mid) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //     dispatch(fetchSuccess([{ id: "1", content: "good", type: "Well" },
    //     { id: "2", content: "need improve", type: "Need Improve" },
    //     { id: "3", content: "so so", type: "Normal" },
    //     { id: "4", content: "great", type: "Well" },
    //     { id: "5", content: "beautiful", type: "Normal" },
    //     { id: "6", content: "normal", type: "Normal" }]));
    // }, 1000);

    request.getComments(mid).then((response) => {
      console.log(response);
      let array = response.data.comments.map((c) => {
        let start = c.text.indexOf('[');
        let end = c.text.indexOf(']');
        return {
          id: c.id,
          content: c.text.substring(0, start),
          type: c.polarity,
          criteria: c.text.substring(start + 1, end),
        };
      });
      console.log(array);
      let comments = groupBy(array, (c) => c.criteria);
      console.log(comments);
      dispatch(fetchSuccess(comments));
    });

    //   request
    //     .getProjects(getState().auth.uid)
    //     .then((response) => {
    //       console.log(response);
    //       dispatch(fetchSuccess(response.data.projList));
    //     })
    //     .catch((error) => {
    //       dispatch(fetchFail(error));
    //     });
  };
};

export const onCreateComment = (mid, stateData, criteria) => {
  let data = {
    markerId: mid,
    text: stateData.comments,
    polarity: stateData.type,
  };
  console.log(data);
  return (dispatch, getState) => {
    // const newId = getState().proj.projects.length;
    // console.log({ ...data, id: newId });
    // setTimeout(() => {
    //     dispatch(createSuccess({ stateData }));
    // }, 1000);

    request.addComment(data).then((response) => {
      console.log(response);
      let id = response.data.commentId;
      let start = stateData.comments.indexOf('[');
      let target = {
        id: id,
        content: stateData.comments.substring(0, start),
        type: stateData.type,
        criteria: criteria,
      };
      dispatch(createSuccess(target));
    });
    //const marker_id = stateData.uid;
    //   request
    //     .createProject(data)
    //     .then((response) => {
    //       console.log(response);
    //       dispatch(createSuccess(response.data));
    //     })
    //     .catch((err) => {
    //       dispatch(createFail);
    //     });
  };
};
