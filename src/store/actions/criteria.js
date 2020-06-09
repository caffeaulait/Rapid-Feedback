import * as actions from './actions';
import * as request from '../api';

export const fetchSuccess = (criterias) => {
  return {
    type: actions.GET_CRITERIA_LIST_SUCCESS,
    criterias: criterias,
  };
};

export const fetchFail = (error) => {
  return {
    type: actions.GET_CRITERIA_LIST_FAIL,
    error,
  };
};

export const createSuccess = (criteria) => {
  return {
    type: actions.CREATE_CRITERIA_SUCCESS,
    criteria,
  };
};

export const createFail = (error) => {
  return {
    type: actions.CREATE_CRITERIA_FAIL,
    error,
  };
};

export const deleteSuccess = (id) => {
  return {
    type: actions.DELETE_CRITERIA_SUCCESS,
    id,
  };
};

export const delelteFail = (error) => {
  return {
    type: actions.DELETE_CRITERIA_FAIL,
    error,
  };
};

export const updateSuccess = (criteria) => {
  return {
    type: actions.UPDATE_CRITERIA_SUCCESS,
    criteria,
  };
};

export const updateFail = (error) => {
  return {
    type: actions.UPDATE_CRITERIA_FAIL,
    error,
  };
};

export const onFetchCriterias = (pid) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //     dispatch(fetchSuccess([{ id: "1", content: "voice, pace and confidence", points: "0" }
    //         , { id: "2", content: "presentation structure", points: "0" }
    //         , { id: "3", content: "quality of slides/visual aids", points: "0" }
    //         , { id: "4", content: "knowledge of the material", points: "0" }
    //         , { id: "5", content: "content", points: "0" }
    //     ]));
    // }, 1000);
    // console.log(getState());

    console.log('make response');
    request
      .getCriterias(pid)
      .then((response) => {
        console.log('response.....');
        console.log(response);
        let array = response.data.criteriaList.map((r) => {
          return {
            id: r.criteriaId,
            content: r.criteriaContent,
            points: r.weight,
          };
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

export const onFetchMarkingCriterias = (pid) => {
  return (dispatch, getState) => {
    // setTimeout(() => {
    //     dispatch(fetchSuccess([{ id: "1", content: "voice, pace and confidence", points: "0" }
    //         , { id: "2", content: "presentation structure", points: "0" }
    //         , { id: "3", content: "quality of slides/visual aids", points: "0" }
    //         , { id: "4", content: "knowledge of the material", points: "0" }
    //         , { id: "5", content: "content", points: "0" }
    //     ]));
    // }, 1000);
    // console.log(getState());

    console.log('make result response');
    request
      .getCriterias(pid)
      .then((response) => {
        console.log('result response.....');
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

export const onDeleteCriteria = (pid, cid) => {
  console.log('deletion criteria!');
  return (dispatch) => {
    // setTimeout(() => {
    //     dispatch(deleteSuccess(id));
    // }, 1000);
    request
      .deletCriteria(pid, cid)
      .then((response) => {
        console.log(response);
        dispatch(deleteSuccess(cid));
      })
      .catch((err) => {
        dispatch(delelteFail(err));
      });
  };
};

export const onCreateCriteria = (stateData, id) => {
  console.log('creating criteria..');
  //   console.log(stateData);
  return (dispatch, getState) => {
    let dataPack = {
      projectId: Number(id),
      content: stateData.content,
      weight: Number(stateData.points),
    };

    // let id = nextID(getState().criteria.criterias.map((item) => {
    //     return Number(item.id);
    // }));
    // console.log(id);
    // const newId = id.toString();
    // console.log({ ...stateData, id: newId });
    // setTimeout(() => {
    //     dispatch(createSuccess({ ...stateData, id: newId }));
    // }, 1000);
    console.log(dataPack);
    request
      .addCriteria(dataPack)
      .then((response) => {
        console.log('this is very important........');
        dispatch(
          createSuccess({
            ...stateData,
            id: response.data.criteriaId.toString(),
          })
        );
      })
      .catch((err) => {
        dispatch(createFail(err));
      });
    //   const marker_id = stateData.uid;
    //   request
    //     .createProject(data, marker_id)
    //     .then((response) => {
    //       console.log(response);
    //       dispatch(createSuccess(response.data));
    //     })
    //     .catch((err) => {
    //       dispatch(createFail);
    //     });
  };
};

export const onUpdateCriteria = (pid, cid, point, item) => {
  console.log('updateing criteria.....');
  return (dispatch) => {
    // setTimeout(() => {
    //     dispatch(updateSuccess(stateData));
    // }, 1000);
    let data = [
      {
        criteriaId: cid,
        weight: point,
      },
    ];
    console.log(data);
    console.log({ ...item, id: cid });
    request
      .setCriteria(pid, data)
      .then(dispatch(updateSuccess({ ...item, id: cid })))
      .catch((err) => {
        dispatch(updateFail(err));
      });
    //   request
    //     .updateProject(data)
    //     .then((response) => {
    //       console.log(response);
    //       dispatch(updateSuccess(response.data));
    //     })
    //     .catch((err) => {
    //       dispatch(updateFail(err));
    //     });
  };
};
