import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (markers) => {
    return {
        type: actions.GET_MARKER_LIST_SUCCESS,
        markers: markers,
    };
};

export const fetchFail = (error) => {
    return {
        type: actions.GET_MARKER_LIST_FAIL,
        error,
    };
};

export const updateSuccess = (markers) => {
    return {
      type: actions.UPDATE_MARKER_SUCCESS,
      markers,
    };
  };
  
  export const updateFail = (error) => {
    return {
      type: actions.UPDATE_MARKER_FAIL,
      error,
    };
  };

  export const onFetchMarkers = () => {
    return (dispatch, getState) => {
    setTimeout(() => {
       dispatch(fetchSuccess([{ Number: "1", Name: "Doe", Email: 'test@gmail.com', isSelected: false },
             { Number: "2", Name: "John", Email: 'test@gmail.com', isSelected: false },
             { Number: "3", Name: "Alice", Email: 'test@gmail.com', isSelected: false }]));
     }, 1000);
    console.log(getState());

      
    //   request
    //     .getMarkers(getState().auth.uid)
    //     .then((response) => {
    //       console.log(response);
    //       dispatch(fetchSuccess([{ Number: "1", Name: "Doe", Email: 'test@gmail.com', isSelected: false },
    //       { Number: "2", Name: "John", Email: 'test@gmail.com', isSelected: false },
    //       { Number: "3", Name: "Alice", Email: 'test@gmail.com', isSelected: false }]));
    //     })
    //     .catch((error) => {
    //       dispatch(fetchFail(error));
    //     });
    };
  };

  export const onUpdateMarkers = (
 
    stateData
  ) => {
    const data = {
      id: parseInt(stateData.id),
      subject_code: stateData.subjectCode,
      subject_name: stateData.subjectName,
      proj_name: stateData.projectName,
      duration_min: parseInt(stateData.durationMin),
      duration_sec: parseInt(stateData.durationSec),
      is_group: stateData.isGroup ? 1 : 0,
      proj_description: stateData.description,
      // date: stateData.date,
      // marker_id: stateData.uid,
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
  
