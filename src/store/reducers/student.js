/* eslint-disable eqeqeq */
import * as actions from '../actions/actions';

const initialState = {
  students: [],
  stuError: null,
};

const fetchSuccess = (state, action) => {
  return {
    ...state,
    students: action.students,
  };
};

const fetchFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const deleteSuccess = (state, action) => {
  const newStudents = state.students.filter((el) => el.id != action.sid);
  state.students = newStudents;
  console.log(newStudents);
  return {
    ...state,
    students: newStudents,
  };
};

const deleteFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const createSuccess = (state, action) => {
  const newStudent = action.student;
  newStudent.id = newStudent.student_id;
  delete newStudent['student_id'];
  newStudent.group_id = 0;
  return {
    ...state,
    students: state.students.concat(newStudent),
  };
};

const createFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const importSuccess = (state, action) => {
  const newStudents = action.students;
  return {
    ...state,
    students: state.students.concat(newStudents),
  };
};

const importFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const updateSucess = (state, action) => {
  const copy = [...state.students];
  const index = copy.findIndex((el) => el.id == action.student.id);
  copy[index] = action.studnet;
  return {
    ...state,
    students: copy,
  };
};

const updateFail = (state, action) => {
  return {
    ...state,
    stuError: action.error,
  };
};

const clearStudents = (state, action) => {
  return {
    ...state,
    students: [],
  };
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_STUDENT_LIST_SUCCESS:
      return fetchSuccess(state, action);
    case actions.DELETE_STUDENT_SUCCESS:
      return deleteSuccess(state, action);
    case actions.CREATE_STUDENT_SUCCESS:
      return createSuccess(state, action);
    case actions.UPDATE_STUDENT_SUCCESS:
      return updateSucess(state, action);
    case actions.GET_STUDENT_LIST_FAIL:
      return fetchFail(state, action);
    case actions.DELETE_STUDENT_FAIL:
      return deleteFail(state, action);
    case actions.CREATE_STUDENT_FAIL:
      return createFail(state, action);
    case actions.UPDATE_STUDENT_FAIL:
      return updateFail(state, action);
    case actions.IMPORT_STUDENTS_SUCCESS:
      return importSuccess(state, action);
    case actions.IMPORT_STUDENTS_FAIL:
      return importFail(state, action);
    case actions.CLEAR_STUDENTS:
      return clearStudents(state, action);
    default:
      return state;
  }
};

export default studentReducer;
