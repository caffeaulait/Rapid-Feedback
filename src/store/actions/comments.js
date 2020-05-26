import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (comments) => {
    console.log(comments)
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

export const onFetchComments = (mid) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(fetchSuccess([{ id: "1", content: "good", type: "Well" },
            { id: "2", content: "need improve", type: "Need Improve" },
            { id: "3", content: "so so", type: "Normal" },
            { id: "4", content: "great", type: "Well" },
            { id: "5", content: "beautiful", type: "Normal" },
            { id: "6", content: "normal", type: "Normal" }]));
        }, 1000);

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


export const onCreateComment = (mid,stateData) => {
    // const data = {
    //   subject_code: stateData.subjectCode,
    //   subject_name: stateData.subjectName,
    //   proj_name: stateData.projectName,
    //   duration: parseInt(stateData.durationMin),
    //   // duration_sec: parseInt(stateData.durationSec),
    //   is_group: stateData.isGroup ? 1 : 0,
    //   proj_description: stateData.description,
    //   due_date: stateData.date.toJSON(),
    //   markerId: stateData.uid,
    // };
    // console.log('creating project..');
    // console.log(data);
    return (dispatch, getState) => {
        // const newId = getState().proj.projects.length;
        // console.log({ ...data, id: newId });
        setTimeout(() => {
            dispatch(createSuccess({ stateData }));
        }, 1000);
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