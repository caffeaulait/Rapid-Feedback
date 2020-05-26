import * as actions from './actions';
import * as request from '../api';
import { act } from 'react-dom/test-utils';

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
    sid,
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

export const importSuccess = (students) => {
  return {
    type: actions.IMPORT_STUDENTS_SUCCESS,
    students,
  };
};

export const importFail = (error) => {
  return {
    type: actions.IMPORT_STUDENTS_FAIL,
    error,
  };
};
export const addCurrentStudentSuccess = (data)=>{
  return {
    type:actions.ADD_CURRENTSTUDENT_SUCCESS,
    students: data,
  }
}
export const addCurrentSutdentFail = (err) =>{
  return {
    type:actions.ADD_CURRENTSTUDENT_FAIL,
    err
  }
}
export const deleteCurrentSutdentFail = (err) =>{
  return {
    type:actions.DELETE_CURRENTSTUDENT_FAIL,
    err
  }
} 
export const deleteCurrentSutdentSuccess = (data) =>{
  return {
    type:actions.DELETE_CURRENTSTUDENT_SUCCESS,
    students: data,
  }
}
export const confirmGroupStudentSuccess = (err) =>{
  return {
    type:actions.CONFIRM_GROUP_STUDENT_SUCCESS,
    err
  }
}
export const confirmGroupStudentFail=(err)=>{
  return{
    type:actions.CONFIRM_GROUP_STUDENT_FAIL
  }
}

export const onFetchStudents = (pid) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //   dispatch(fetchSuccess(fakeData));
    // }, 1000);
    // console.log(getState());
    request
      .getStudents(pid)
      .then((response) => {
        console.log(response);
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFail(error));
      });
  };
};
export const addCurrentStudent = (student,students) =>{
  var newStudents =  students.map(function(val,index){
    if(val.id == student.id){
      val.selected = true;
    }
    return val;
  })
  return (dispatch) =>{
    dispatch(addCurrentStudentSuccess(newStudents))
  }

}
export const  deleteCurentStudent = (student,students) =>{
   var newStudents =  students.map(function(val,index){
     if(val.id == student.id){
       val.selected = false;
     }
     return val;
   })
    return (dispatch) =>{
     dispatch(deleteCurrentSutdentSuccess(newStudents))
    };

}
export const  confirmStudentGroup = (pid,groupid,students) =>{
  // http://ec2-13-211-29-46.ap-southeast-2.compute.amazonaws.com:5001/v1/groups
  // {
  //   "project_id": 0,
  //   "group_id": 0,
  //   "studentList": [
  //     {
  //       "student_id": 0
  //     }
  //   ]
  // }
  let data =  {
      "project_id": pid,
      "group_id": groupid,
      "studentList": students
    }
  return (dispatch) =>{
    request.addStudentGroup(data).then((response) =>{
      console.log(response);
      dispatch(onFetchStudents(pid));
      // dispatch(confirmGroupStudentSuccess())
    }).catch((err)=>{
      dispatch(confirmGroupStudentFail(err))
    })
  }

}
export const searchStudent = (student) =>{

}


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
    project_id: pid,
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

export const onImportStudents = (pid, students) => {
  const data = {
    project_id: parseInt(pid),
    studentList: students.map((student) => {
      return {
        uni_student_number: parseInt(student.number),
        first_name: student.firstName,
        last_name: student.lastName,
        uni_email: student.email,
      };
    }),
  };
  console.log(data);
  return (dispatch) => {
    request
      .importStudents(data)
      .then((response) => {
        console.log(response);
        const result = response.data;
        result.forEach((student) => {
          student.id = student.student_id;
          delete student['student_id'];
          return student;
        });
        console.log(result);
        dispatch(importSuccess(result));
      })
      .catch((err) => {
        dispatch(importFail(err));
      });
  };
};

const fakeData = [
  {
    uni_student_number: 123321,
    first_name: 'mia',
    last_name: 'smith',
    uni_email: 'mias@gmail.com',
    group_id: 0,
    id: 0,
    is_assessed: 0,
  },
  {
    uni_student_number: 456654,
    first_name: 'jerry',
    last_name: 'stan',
    uni_email: 'jerrys@gmail.com',
    group_id: 0,
    id: 1,
    is_assessed: 0,

  },
  {
    uni_student_number: 789987,
    first_name: 'chris',
    last_name: 'stuwart',
    uni_email: 'chris@gmail.com',
    group_id: 0,
    id: 2,
    is_assessed: 0,

  },
  {
    uni_student_number: 123321,
    first_name: 'mia1',
    last_name: 'smith1',
    uni_email: 'mias@gmail.com',
    group_id: 1,
    id: 4,
    is_assessed: 0,

  },
  {
    uni_student_number: 456654,
    first_name: 'jerry1',
    last_name: 'stan1',
    uni_email: 'jerrys@gmail.com',
    group_id: 1,
    id: 5,
    is_assessed: 0,

  },
  {
    uni_student_number: 789987,
    first_name: 'chris1',
    last_name: 'stuwart1',
    uni_email: 'chris@gmail.com',
    group_id: 1,
    id: 6,
    is_assessed: 0,

  },
];
