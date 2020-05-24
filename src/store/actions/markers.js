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

export const fetchCurrentSuccess = (markers) => {
  return {
    type: actions.GET_CURRENT_MARKER_LIST_SUCCESS,
    currentMarkers: markers,
    previousMarkers: markers
  }
}

export const fetchCurrentFail = (error) => {
  return {
    type: actions.GET_CURRENT_MARKER_LIST_FAIL,
    error,
  }
}

export const addSuccess = (marker) => {
  return {
    type: actions.ADD_CURRENT_MARKER_SUCCESS,
    marker,
  }
}

export const addFail = (error) => {
  return {
    type: actions.ADD_CURRENT_MARKER_FAIL,
    error,
  }
}


export const deleteSuccess = (marker) => {
  return {
    type: actions.DELETE_CURRENT_MARKER_SUCCESS,
    marker,
  }
}

export const deleteFail = (error) => {
  return {
    type: actions.DELETE_CURRENT_MARKER_FAIL,
    error,
  }
}


export const updateSuccess = (markers) => {
  return {
    type: actions.UPDATE_MARKER_SUCCESS,
    currentMarkers: markers,
  };
};

export const updateFail = (error) => {
  return {
    type: actions.UPDATE_MARKER_FAIL,
    error,
  };
};

export const onFetchMarkers = (pid) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //   dispatch(fetchSuccess([{ Number: "1", Name: "Doe", Email: 'test@gmail.com', isSelected: true },
    //   { Number: "2", Name: "John", Email: 'test@gmail.com', isSelected: false },
    //   { Number: "3", Name: "Alice", Email: 'test@gmail.com', isSelected: false }]));
    // }, 1000);
    // console.log(getState());
    // let currentMarker = getState().marker.currentMarkers.map((marker) => {
    //   return marker.id;
    // });



    // request
    //   .getAllMarkers()
    //   .then((response) => {
    //     console.log(response);
    //     let markerList = response.data.map((marker) => {
    //       return {
    //         id: marker.id,
    //         Number: marker.uni_id,
    //         Email: marker.uni_email,
    //         Name: marker.first_name + " " + marker.last_name,
    //         isSelected: currentMarker.includes(marker.id) ? true : false
    //       };
    //     })
    //     console.log("........");
    //     console.log(markerList);

    //     dispatch(fetchSuccess(markerList));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchFail(error));
    //   });

    request
      .getMarkers(pid)
      .then((response1) => {
        console.log("current......");
        console.log(response1);
        request
          .getAllMarkers()
          .then((response2) => {
            console.log("alll......");
            console.log(response2);
            let markerList = response2.data.map((marker) => {
              return {
                id: marker.id,
                Number: marker.uni_id,
                Email: marker.uni_email,
                Name: marker.first_name + " " + marker.last_name,
                isSelected: response1.data.markerIdList.includes(marker.id) ? true : false
              };
            })
            let final = markerList.filter((marker) => marker.isSelected === false);

            console.log("........");
            console.log(final);

            dispatch(fetchSuccess(final));
          })
          .catch((error) => {
            dispatch(fetchFail(error));
          });
      }).catch((error) => {
        dispatch(fetchCurrentFail(error));
      })

  };
};


export const onFetchCurrentMarkers = (pid) => {
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(fetchCurrentSuccess([]));
    // }, 1000);

    request
      .getMarkers(pid)
      .then((response1) => {
        console.log(response1);
        request
          .getAllMarkers()
          .then((response2) => {
            console.log(response2);
            let markerList = response2.data.map((marker) => {
              return {
                id: marker.id,
                Number: marker.uni_id,
                Email: marker.uni_email,
                Name: marker.first_name + " " + marker.last_name,
                isSelected: response1.data.markerIdList.includes(marker.id) ? true : false
              };
            })

            let final = markerList.filter((marker) => marker.isSelected === true);
            console.log("........");
            console.log(markerList);

            dispatch(fetchCurrentSuccess(final));
          })
          .catch((error) => {
            dispatch(fetchFail(error));
          });
      }).catch((error) => {
        dispatch(fetchCurrentFail(error));
      })

  }
}

export const onUpdateMarkers = (

  stateData, pid,oldData
) => {
  const data = stateData.map((marker) => {
    return Number(marker.id);
  });
  const preData = oldData.map((marker) => {
    return Number(marker.id);
  })
  console.log("predata...")
  console.log(preData)
  let nData = data.filter(n => !preData.includes(n))
  const dataPack = {
    markerIdList: nData,
    projectId: Number(pid)
  }
  console.log('updateing project..');
  console.log(dataPack);
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(updateSuccess(data));
    // }, 1000);

    
    request
      .updateMarkers(dataPack)
      .then((response) => {
        console.log(response);
        // dispatch(updateSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateFail(err));
      });


  };
};

