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

export const onFetchResult = (
  pid
) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //   dispatch(
    //     fetchSuccess(
    //       array
    //     //   [
    //     //   { id: '1', point: 0, comment: '' },
    //     //   { id: '2', point: 0, comment: '' },
    //     //   { id: '3', point: 0, comment: '' },
    //     //   { id: '4', point: 0, comment: '' },
    //     //   { id: '5', point: 0, comment: '' },
    //     // ]
    //     )
    //   );
    // }, 1000);
    request
      .getCriterias(pid)
      .then((response) => {
        console.log("response.....")
        console.log(response);
        let array = response.data.criteriaList.map((r) => {
          return { id: r.criteriaId, point: 0, comment: "" };
        })
        // dispatch(fetchSuccess([{ id: "1", content: "voice, pace and confidence", points: "0" }
        //     , { id: "2", content: "presentation structure", points: "0" }
        //     , { id: "3", content: "quality of slides/visual aids", points: "0" }
        //     , { id: "4", content: "knowledge of the material", points: "0" }
        //     , { id: "5", content: "content", points: "0" }
        // ]));
        dispatch(fetchSuccess(array));
      })
      .catch((error) => {
        dispatch(fetchFail(error));
      });
  };
};

export const onFetchGroupResult = (
  pid
) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //   dispatch(
    //     fetchSuccess(
    //       array
    //     //   [
    //     //   { id: '1', point: 0, comment: '' },
    //     //   { id: '2', point: 0, comment: '' },
    //     //   { id: '3', point: 0, comment: '' },
    //     //   { id: '4', point: 0, comment: '' },
    //     //   { id: '5', point: 0, comment: '' },
    //     // ]
    //     )
    //   );
    // }, 1000);
    request
      .getCriterias(pid)
      .then((response) => {
        console.log("response.....")
        console.log(response);
        let array = response.data.criteriaList.map((r) => {
          return { id: r.criteriaId, point: 0, comment: {} };
        })
        // dispatch(fetchSuccess([{ id: "1", content: "voice, pace and confidence", points: "0" }
        //     , { id: "2", content: "presentation structure", points: "0" }
        //     , { id: "3", content: "quality of slides/visual aids", points: "0" }
        //     , { id: "4", content: "knowledge of the material", points: "0" }
        //     , { id: "5", content: "content", points: "0" }
        // ]));
        dispatch(fetchSuccess(array));
      })
      .catch((error) => {
        dispatch(fetchFail(error));
      });
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

export const onUploadResult = (mid, pid, sid, assessList, assessedDate, gid) => {
  const data = {
    assessList: assessList,
    projectId: pid,
    markerId: mid,
    studentId: sid,
    groupId: gid,
    assessedDate: assessedDate
  }

  console.log("upload resulttttttttttt")
  console.log(data);
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(updateSuccess(data));
    // }, 1000);
    request
      .uploadResults(data)
      .then((response) => {
        console.log(response);
        // dispatch(updateSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateResultFail(err));
      });
  }
};
