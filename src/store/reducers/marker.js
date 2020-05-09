import * as actions from '../actions/actions';

const initialState = {
    markers: [],
    markerError: null,
};

const fetchSuccess = (state, action) => {
    return {
        ...state,
        markers: action.markers,
    };
};

const fetchFail = (state, action) => {
    return {
        ...state,
        markerError: action.error,
    };
};


const updateSucess = (state, action) => {
    return {
        ...state,
        markers: action.markers,
    };
};

const updateFail = (state, action) => {
    return {
        ...state,
        projError: action.error,
    };
};

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_MARKER_LIST_SUCCESS:
            return fetchSuccess(state, action);
        case actions.UPDATE_MARKER_SUCCESS:
            return updateSucess(state, action);
        case actions.GET_MARKER_LIST_FAIL:
            return fetchFail(state, action);
        case actions.UPDATE_MARKER_FAIL:
            return updateFail(state, action);
        default:
            return state;
    }
};

export default markerReducer;
