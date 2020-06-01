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

const uploadAudioSuccess = () => {
  return {
    type: actions.UPLOAD_AUDIO_SUCCESS,
  };
};

const uploadAudioFail = (error) => {
  return {
    type: actions.UPLOAD_AUDIO_FAIL,
    error,
  };
};

export const onFetchResult = (pid) => {
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
        console.log('response.....');
        console.log(response);
        let array = response.data.criteriaList.map((r) => {
          return { id: r.criteriaId, point: 0, comment: '' };
        });
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

export const onFetchGroupResult = (pid) => {
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
        console.log('response.....');
        console.log(response);
        let array = response.data.criteriaList.map((r) => {
          return { id: r.criteriaId, point: 0, comment: {} };
        });
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

const groupBy = (xs, key) => {
  let obj = xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  const results = [];
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      results.push({ markerId: k, results: obj[k] });
    }
  }
  return results;
};

export const onFetchAllResult = (pid, tid) => {
  return (dispatch, getState) => {
    request
      .getAllResults(pid, tid)
      .then((response) => {
        console.log(response);
        const results = groupBy(response.data.individualResults, 'markerId');
        dispatch(fetchAllResultSuccess(results));
      })
      .catch((err) => {
        dispatch(fetchAllResultFail(err));
      });
  };
};

export const onSendReport = (data) => {
  console.log(data);
  return (dispatch) => {
    request
      .sendReport(data)
      .then((response) => {
        console.log(response);
        dispatch(sendReportSuccess());
      })
      .catch((error) => {
        dispatch(sendReportFail(error));
      });
  };
};

export const onUploadAudio = (data) => {
  return (dispatch) => {
    request
      .uploadAudio(data)
      .then((response) => {
        console.log(response);
        dispatch(uploadAudioSuccess());
      })
      .catch((error) => {
        dispatch(uploadAudioFail(error));
      });
  };
};


export const onUpdateResult = (
  mid,
  pid,
  sid,
  assessList,
  assessedDate,
  gid
) => {
  const data = {
    assessList: assessList,
    projectId: Number(pid),
    markerId: mid,
    studentId: sid,
    groupId: Number(gid),
    assessedDate: assessedDate,
  };

  console.log('update resulttttttttttt');
  console.log(data);
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(updateSuccess(data));
    // }, 1000);
    request
      .upDateResult(data)
      .then((response) => {
        console.log(response);
        // dispatch(updateSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateResultFail(err));
      });
    };
  };

  export const onUploadResult = (
    mid,
    pid,
    sid,
    assessList,
    assessedDate,
    gid
  ) => {
    const data = {
      assessList: assessList,
      projectId: pid,
      markerId: mid,
      studentId: sid,
      groupId: gid,
      assessedDate: assessedDate,
    };

    console.log('upload resulttttttttttt');
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
    };
  };
