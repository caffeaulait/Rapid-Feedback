import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (data) => {
  return {
    type: actions.GET_STUDENT_LIST_SUCCESS,
    students: data,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_STUDENT_LIST_FAIL,
    error,
  };
};

export const createSuccess = (student) => {
  return {
    type: actions.CREATE_STUDENT_SUCCESS,
    student,
  };
};

export const createFail = (error) => {
  return {
    type: actions.CREATE_STUDENT_FAIL,
    error,
  };
};

export const deleteSuccess = (pid, sid) => {
  return {
    type: actions.DELETE_STUDENT_SUCCESS,
    pid,
    sid
  };
};

export const delelteFail = (error) => {
  return {
    type: actions.DELETE_STUDENT_FAIL,
    error,
  };
};

export const updateSuccess = (student) => {
  return {
    type: actions.UPDATE_STUDENT_SUCCESS,
    student,
  };
};

export const updateFail = (error) => {
  return {
    type: actions.UPDATE_STUDENT_FAIL,
    error,
  };
};

export const onFetchStudents = (pid) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(fetchSuccess(fakeData));
    }, 1000);
    console.log(getState());
    // request
    //   .getStudents(pid)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch(fetchSuccess(response.data));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchFail(error));
    //   });
  };
};

export const onDeleteStudent = (pid, sid) => {
  //   console.log('deletion dispatched!');
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(deleteSuccess(id));
    // }, 1000);
    request
      .deleteStudent(pid, sid)
      .then((response) => {
        console.log(response);
        dispatch(deleteSuccess(pid, sid));
      })
      .catch((err) => {
        dispatch(delelteFail(err));
      });
  };
};

export const onCreateStudent = (stateData, pid) => {
  //添加addstudent Post 参数
  const data = {
    uni_student_number: parseInt(stateData.stuNo),
    first_name: stateData.firstName,
    last_name: stateData.lastName,
    uni_email: stateData.email,
    project_id: pid
  };
  console.log('creating student..');
  //   console.log(stateData);
  return (dispatch, getState) => {
    // const newId = getState().proj.projects.length;
    // console.log({ ...data, id: newId });
    // setTimeout(() => {
    //   dispatch(createSuccess({ ...data, id: newId }));
    // }, 1000);
    request
      .createStudent(data)
      .then((response) => {
        console.log(response);
        dispatch(createSuccess(response.data));
      })
      .catch((err) => {
        dispatch(createFail);
      });
  };
};

export const onUpdateStudent = (stateData) => {
  const data = {
    id: parseInt(stateData.id),
    uni_student_number: parseInt(stateData.stuNo),
    first_name: stateData.firstName,
    last_name: stateData.lastName,
    uni_email: stateData.email,
  };
  console.log('updateing student..');
  console.log(data);
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(updateSuccess(data));
    // }, 1000);
    request
      .updateStudent(data)
      .then((response) => {
        console.log(response);
        dispatch(updateSuccess(response.data));
      })
      .catch((err) => {
        dispatch(updateFail(err));
      });
  };
};

const fakeData = [
  {
    uni_student_number: 123321,
    first_name: "mia",
    last_name: "smith",
    uni_email: "mias@gmail.com",
    id: 0,
  },
  {
    uni_student_number: 456654,
    first_name: "jerry",
    last_name: "stan",
    uni_email: "jerrys@gmail.com",
    id: 1,
  },
  {
    uni_student_number: 789987,
    first_name: "chris",
    last_name: "stuwart",
    uni_email: "chris@gmail.com",
    id: 2,
  },
];