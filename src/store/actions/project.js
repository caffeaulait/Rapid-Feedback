import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (projects) => {
  return {
    type: actions.GET_PROJECT_LIST_SUCCESS,
    projects: projects,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_PROJECT_LIST_FAIL,
    error,
  };
};

export const createSuccess = (project) => {
  return {
    type: actions.CREATE_PROJECT_SUCCESS,
    project,
  };
};

export const createFail = (error) => {
  return {
    type: actions.CREATE_PROJECT_FAIL,
    error,
  };
};

export const deleteSuccess = (id) => {
  return {
    type: actions.DELETE_PROJECT_SUCCESS,
    id,
  };
};

export const delelteFail = (error) => {
  return {
    type: actions.DELETE_PROJECT_FAIL,
    error,
  };
};

export const updateSuccess = () => {
  return {
    type: actions.UPDATE_PROJECT_SUCCESS,
  };
};

export const updateFail = (error) => {
  return {
    type: actions.UPDATE_PROJECT_FAIL,
    error,
  };
};

export const onFetchProjects = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(fetchSuccess(fakeData));
    }, 1000);
    console.log(getState());
    // request
    //   .getProjects(getState().auth.uid)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch(fetchSuccess(response.data.projList));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchFail(error));
    //   });
  };
};

export const onDeleteProject = (id) => {
  //   console.log('deletion dispatched!');
  return (dispatch) => {
    request
      .deleteProject(id)
      .then((response) => {
        console.log(response);
        dispatch(deleteSuccess(id));
      })
      .catch((err) => {
        dispatch(delelteFail(err));
      });
  };
};

export const onCreateProject = (
  subjectCode,
  subjectName,
  projectName,
  minutes,
  seconds,
  isGroup,
  description
) => {
  const data = {
    subject_code: subjectCode,
    subject_name: subjectName,
    proj_name: projectName,
    duration_min: minutes,
    duration_sec: seconds,
    is_group: isGroup ? 1 : 0,
    proj_description: description,
  };
  console.log('creating project..');
  return (dispatch) => {
    request
      .createProject(data)
      .then((response) => {
        console.log(response);
        dispatch(createSuccess(response.data.project));
      })
      .catch((err) => {
        dispatch(createFail);
      });
  };
};

export const onUpdateProject = (
  id,
  subjectCode,
  subjectName,
  projectName,
  minutes,
  seconds,
  isGroup,
  description
) => {
  const data = {
    id,
    subject_code: subjectCode,
    subject_name: subjectName,
    proj_name: projectName,
    duration_min: minutes,
    duration_sec: seconds,
    is_group: isGroup ? 1 : 0,
    proj_description: description,
  };
  console.log('updateing project..');
  return (dispatch) => {
    request
      .updateProject(data)
      .then((response) => {
        console.log(response);
        dispatch(updateSuccess(response.data.project));
      })
      .catch((err) => {
        dispatch(updateFail(err));
      });
  };
};

const fakeData = [
  {
    subject_code: 'COMP90082',
    subject_name: 'Software Project',
    proj_name: 'Assignment1',
    duration_min: 50,
    duration_sec: 10,
    is_group: 1,
    proj_description:
      'This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.',
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
      'a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque',
    id: 1,
  },
  {
    subject_code: 'SWEN90004',
    subject_name: 'Modelling Complex Software Systems',
    proj_name: 'Assignment2',
    duration_min: 50,
    duration_sec: 30,
    is_group: 0,
    proj_description:
      'The objectives of this project are to provide you with the opportunity to develop your skills in implementing a computational model of a complex system, using it to conduct experiments, reporting on the design of the model and the results of these experiments, and working in a group context.',
    id: 2,
  },
];
