import * as actions from './actions';
import * as request from '../api';
import {nextID} from '../../util/array';

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

export const onFetchCriterias = () => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(fetchSuccess([{ id: "1", content: "voice, pace and confidence", points: "0" }
                , { id: "2", content: "presentation structure", points: "0" }
                , { id: "3", content: "quality of slides/visual aids", points: "0" }
                , { id: "4", content: "knowledge of the material", points: "0" }
                , { id: "5", content: "content", points: "0" }
            ]));
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

export const onDeleteCriteria = (id) => {
    console.log('deletion criteria!');
    return (dispatch) => {
        setTimeout(() => {
            dispatch(deleteSuccess(id));
        }, 1000);
        //   request
        //     .deleteProject(id)
        //     .then((response) => {
        //       console.log(response);
        //       dispatch(deleteSuccess(id));
        //     })
        //     .catch((err) => {
        //       dispatch(delelteFail(err));
        //     });
    };
};




export const onCreateCriteria = (stateData) => {

    console.log('creating criteria..');
    //   console.log(stateData);
    return (dispatch, getState) => {

        let id = nextID(getState().criteria.criterias.map((item) => {
            return Number(item.id);
        }));
        console.log(id);
        const newId = id.toString();
        console.log({ ...stateData, id: newId });
        setTimeout(() => {
            dispatch(createSuccess({ ...stateData, id: newId }));
        }, 1000);
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

export const onUpdateCriteria = (

    stateData
) => {
    console.log('updateing criteria..');
    return (dispatch) => {
        setTimeout(() => {
            dispatch(updateSuccess(stateData));
        }, 1000);
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