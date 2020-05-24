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

export const updateSuccess = (project) => {
  return {
    type: actions.UPDATE_PROJECT_SUCCESS,
    project,
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
    // setTimeout(() => {
    //   dispatch(deleteSuccess(id));
    // }, 1000);
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

export const onCreateProject = (stateData) => {
  const data = {
    subject_code: stateData.subjectCode,
    subject_name: stateData.subjectName,
    proj_name: stateData.projectName,
    duration: parseInt(stateData.durationMin),
    // duration_sec: parseInt(stateData.durationSec),
    is_group: stateData.isGroup ? 1 : 0,
    proj_description: stateData.description,
    due_date: stateData.date.toJSON(),
    markerId: stateData.uid,
  };
  console.log('creating project..');
  console.log(data);
  return (dispatch, getState) => {
    // const newId = getState().proj.projects.length;
    // console.log({ ...data, id: newId });
    // setTimeout(() => {
    //   dispatch(createSuccess({ ...data, id: newId }));
    // }, 1000);
    // const marker_id = stateData.uid;
    request
      .createProject(data)
      .then((response) => {
        console.log(response);
        dispatch(createSuccess(response.data));
      })
      .catch((err) => {
        dispatch(createFail);
      });
  };
};

export const onUpdateProject = (
  //   id,
  //   subjectCode,
  //   subjectName,
  //   projectName,
  //   minutes,
  //   seconds,
  //   isGroup,
  //   description
  stateData
) => {
  const data = {
    id: parseInt(stateData.id),
    subject_code: stateData.subjectCode,
    subject_name: stateData.subjectName,
    proj_name: stateData.projectName,
    duration: parseInt(stateData.durationMin),
    // duration_sec: parseInt(stateData.durationSec),
    is_group: stateData.isGroup ? 1 : 0,
    proj_description: stateData.description,
    due_date: stateData.date.toJSON(),
  };
  console.log('updateing project..');
  console.log(data);
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(updateSuccess(data));
    // }, 1000);
    request
      .updateProject(data)
      .then((response) => {
        console.log(response);
        dispatch(updateSuccess(response.data));
      })
      .catch((err) => {
        dispatch(updateFail(err));
      });
  };
};

// eslint-disable-next-line no-unused-vars
const fakeData = [
  {
    subject_code: 'COMP90082',
    subject_name: 'Software Project',
    proj_name: 'Assignment1',
    duration_min: 50,
    // duration_sec: 10,
    is_group: 0,
    proj_description:
      'This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.This is the capstone project for students.',
    id: 0,
    due_date: new Date(),
  },
  {
    subject_code: 'COMP90049',
    subject_name: 'Knowledge Technology',
    proj_name: 'Assignment2',
    duration_min: 30,
    // duration_sec: 30,
    is_group: 1,
    proj_description:
      'a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque',
    id: 1,
    due_date: new Date(),
  },
  {
    subject_code: 'SWEN90004',
    subject_name: 'Modelling Complex Software Systems',
    proj_name: 'Assignment2',
    duration_min: 50,
    // duration_sec: 30,
    is_group: 1,
    proj_description:
      'The objectives of this project are to provide you with the opportunity to develop your skills in implementing a computational model of a complex system, using it to conduct experiments, reporting on the design of the model and the results of these experiments, and working in a group context.',
    id: 2,
    due_date: new Date(),
  },
];
