import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (data) => {
  return {
    type: actions.GET_MEMEBR_LIST_SUCCESS,
    members: data,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_MEMEBR_LIST_FAIL,
    error,
  };
};

export const fetchCurrentSuccess = (data) => {
  return {
    type: actions.GET_CURRENT_MEMEBR_LIST_SUCCESS,
    currentMembers: data,
  }
}

export const fetchCurrentFail = (error) => {
  return {
    type: actions.GET_CURRENT_MEMEBR_LIST_FAIL,
    error,
  }
}
export const addSuccess = (member) => {
  return {
    type: actions.ADD_CURRENT_MEMEBR_FAIL,
    member,
  }
}

export const addFail = (error) => {
  return {
    type: actions.ADD_CURRENT_MARKER_FAIL,
    error,
  }
}


// export const deleteSuccess = (member) => {
//   return {
//     type: actions.DELETE_CURRENT_MEMEBR_SUCCESS,
//     member,
//   }
// }

// export const deleteFail = (error) => {
//   return {
//     type: actions.DELETE_CURRENT_MEMEBR_FAIL,
//     error,
//   }
// }

export const createSuccess = (group) => {
  return {
    type: actions.CREATE_GROUP_SUCCESS,
    group,
  };
};

export const createFail = (error) => {
  return {
    type: actions.CREATE_GROUP_FAIL,
    error,
  };
};

export const deleteSuccess = (pid, gid) => {
  return {
    type: actions.DELETE_GROUP_SUCCESS,
    pid,
    gid
  };
};

export const delelteFail = (error) => {
  return {
    type: actions.DELETE_GROUP_FAIL,
    error,
  };
};


export const onFetchMembers = (pid) => {
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

export const onFetchCurrentMembers = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(fetchCurrentSuccess([
        {
          uni_student_number: 123321,
          first_name: "mia",
          last_name: "smith",
          uni_email: "mias@gmail.com",
          id: 0,
          isSelected: true, 
        }
      ]));
    }, 1000);
  }
}

export const onDeleteGroup = (pid, gid) => {
  //   console.log('deletion dispatched!');
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(deleteSuccess(id));
    // }, 1000);
    request
      .deleteGroup(pid, gid)
      .then((response) => {
        console.log(response);
        dispatch(deleteSuccess(pid, gid));
      })
      .catch((err) => {
        dispatch(delelteFail(err));
      });
  };
};

export const onCreateGroup = (stateData, pid, gid) => {
  //添加addstudent Post 参数
  const data = {
    uni_student_number: parseInt(stateData.stuNo),
    group_id: gid,
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
      .createGroup(data)
      .then((response) => {
        console.log(response);
        dispatch(createSuccess(response.data));
      })
      .catch((err) => {
        dispatch(createFail);
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
    isSelected: true, 
  },
  {
    uni_student_number: 456654,
    first_name: "jerry",
    last_name: "stan",
    uni_email: "jerrys@gmail.com",
    id: 1,
    isSelected: false, 
  },
  {
    uni_student_number: 789987,
    first_name: "chris",
    last_name: "stuwart",
    uni_email: "chris@gmail.com",
    id: 2,
    isSelected: false, 
  },
];