import * as actions from '../actions/actions';

const initialState = {
    markers: [],
    currentMarkers: [],
    markerError: null,
};

const findMarkerIndex = (marker) => {
    let array = this.props.allMarkers.map(a => a.Number);
    var index = array.indexOf(marker.Number)

    return index;
}

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

const fetchCurrentSuccess = (state, action) => {
    return {
        ...state,
        currentMarkers: action.currentMarkers,
    }
}


const fetchCurrentFail = (state, action) => {
    return {
        ...state,
        markerError: action.error,
    }
}

const addSuccess = (state, action) => {
    console.log(state);
    const newCurrentMarker = action.marker;
    let array = state.markers.map(a => a.Number);
    console.log(array);
    var index = array.indexOf(action.marker.Number);
    console.log(index);
    let markers = state.markers;
    markers[index].isSelected = true;
    return {
        ...state,
        currentMarkers: state.currentMarkers.concat(newCurrentMarker),
        markers: markers,
    };
};

const addFail = (state, action) => {
    return {
        ...state,
        markerError: action.error,
    };
};


const deleteSuccess = (state, action) => {
    const newCurrentMarkers = state.currentMarkers.filter((el) => el.Number != action.marker.Number);
    let array = state.markers.map(a => a.Number);
    var index = array.indexOf(action.marker.Number);
    let markers = state.markers;
    markers[index].isSelected = false;
    console.log(newCurrentMarkers);
    return {
        ...state,
        currentMarkers: newCurrentMarkers,
        markers: markers,
    };
};

const deleteFail = (state, action) => {
    return {
        ...state,
        markerError: action.error,
    };
};

const updateSucess = (state, action) => {
    return {
        ...state,
        currentMarkers: action.currentMarkers,
    };
};

const updateFail = (state, action) => {
    return {
        ...state,
        markerError: action.error,
    };
};

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_MARKER_LIST_SUCCESS:
            return fetchSuccess(state, action);
        case actions.GET_CURRENT_MARKER_LIST_SUCCESS:
            return fetchCurrentSuccess(state,action);
        case actions.UPDATE_MARKER_SUCCESS:
            return updateSucess(state, action);
        case actions.ADD_CURRENT_MARKER_SUCCESS:
            return addSuccess(state,action);
        case actions.DELETE_CURRENT_MARKER_SUCCESS:
            return deleteSuccess(state,action);
        case actions.DELETE_CURRENT_MARKER_FAIL:
            return deleteFail(state,action);
        case actions.ADD_CURRENT_MARKER_FAIL:
            return addFail(state,action);
        case actions.GET_MARKER_LIST_FAIL:
            return fetchFail(state, action);
        case actions.UPDATE_MARKER_FAIL:
            return updateFail(state, action);
        case actions.GET_CURRENT_MARKER_LIST_FAIL:
            return fetchCurrentFail(state,action);
        default:
            return state;
    }
};

export default markerReducer;
