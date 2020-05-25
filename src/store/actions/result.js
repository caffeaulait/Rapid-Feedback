import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (result) => {
  console.log(result);
  return {
    type: actions.GET_SINGLE_RESULT_SUCCESS,
    singleResult: result,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_SINGLE_RESULT_FAIL,
    error,
  };
};

export const fetchAllResultSuccess = (results) => {
  return {
    type: actions.GET_ALL_RESULT_SUCCESS,
    allResults: results,
  };
};

export const fetchAllResultFail = (error) => {
  return {
    type: actions.GET_ALL_RESULT_FAIL,
    error,
  };
};

export const updateResultSuccess = (result) => {
  return {
    type: actions.UPDATE_RESULT_SUCCESS,
    singleResult: result,
  };
};

export const updateResultFail = (error) => {
  return {
    type: actions.UPDATE_RESULT_FAIL,
    error,
  };
};

const sendReportSuccess = () => {
  return {
    type: actions.SEND_REPORT_SUCCESS,
  };
};

const sendReportFail = (error) => {
  return {
    type: actions.SEND_REPORT_FAIL,
    error,
  };
};

export const onFetchResult = (pid, tid, mid) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(
        fetchSuccess([
          { id: '1', point: 0, comment: '1' },
          { id: '2', point: 5, comment: '2' },
          { id: '3', point: 0, comment: '3' },
          { id: '4', point: 5, comment: '4' },
          { id: '5', point: 0, comment: '5' },
        ])
      );
    }, 1000);
  };
};

export const onFetchAllResult = (pid, tid) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(
        fetchSuccess([
          {
            id: 1,
            result: [
              { id: '1', point: 0, comment: '1' },
              { id: '2', point: 1, comment: '2' },
              { id: '3', point: 2, comment: '3' },
              { id: '4', point: 5, comment: '4' },
              { id: '5', point: 5, comment: '5' },
            ],
            assessDate: '08.2.2020',
          },
          {
            id: 2,
            result: [
              { id: '1', point: 0, comment: '13434' },
              { id: '2', point: 5, comment: '2434' },
              { id: '3', point: 8, comment: '343' },
              { id: '4', point: 5, comment: '4343' },
              { id: '5', point: 10, comment: '54343' },
            ],
            assessDate: '23.8.2020',
          },
          {
            id: 3,
            result: [
              { id: '1', point: 0, comment: '1grg' },
              { id: '2', point: 5, comment: '2ghgh' },
              { id: '3', point: 5, comment: '3hg' },
              { id: '4', point: 3, comment: '4hgh' },
              { id: '5', point: 7, comment: '5ghgh' },
            ],
            assessDate: '25.12.2020',
          },
        ])
      );
    }, 1000);
  };
};

export const onSendReport = (pid, tid) => {
  const data = null;
  return (dispatch) => {
    request
      .sendReport(data)
      .then((response) => {
        dispatch(sendReportSuccess());
      })
      .catch((error) => {
        dispatch(sendReportFail(error));
      });
  };
};

export const onUpdateMarkers = (stateData, pid, oldData) => {
  //   const data = stateData.map((marker) => {
  //     return Number(marker.id);
  //   });
  //   const preData = oldData.map((marker) => {
  //     return Number(marker.id);
  //   })
  //   console.log("predata...")
  //   console.log(preData)
  //   let nData = data.filter(n => !preData.includes(n))
  //   const dataPack = {
  //     markerIdList: nData,
  //     projectId: Number(pid)
  //   }
  //   console.log('updateing project..');
  //   console.log(dataPack);
  //   return (dispatch) => {
  //     // setTimeout(() => {
  //     //   dispatch(updateSuccess(data));
  //     // }, 1000);
  //     request
  //       .updateMarkers(dataPack)
  //       .then((response) => {
  //         console.log(response);
  //         // dispatch(updateSuccess(response.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch(updateFail(err));
  //       });
};
