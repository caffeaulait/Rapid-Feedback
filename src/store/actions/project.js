import * as actions from './actions';
import * as api from '../api';
import thunk from 'redux-thunk';

export const fetchSuccess = (projects) => {
  return {
    type: actions.GET_PROJECT_LIST,
    projects: projects,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.FETCH_FAIL,
    error,
  };
};

const fake = [
  {
    subject_code: 'COMP90082',
    subject_name: 'Software Project',
    proj_name: 'Assignment1',
    duration_min: 50,
    duration_sec: 10,
    is_group: 1,
    proj_description: 'This is the capstone project for students',
    id: 0,
  },
  {
    subject_code: 'COMP90049',
    subject_name: 'Knowledge Technology',
    proj_name: 'Assignment2',
    duration_min: 30,
    duration_sec: 30,
    is_group: 0,
    proj_description:
      'an technial comparison of advanced machine learning techinque',
    id: 1,
  },
];

export const onFetchProjects = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(fetchSuccess(fake));
    }, 2000);
    // api
    //   .getProjects(id)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch(fetchSuccess(response.data.projects));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchFail(error));
    //   });
  };
};
