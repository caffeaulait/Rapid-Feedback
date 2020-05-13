import * as actions from '../actions/actions';

const initialState = {
    criterias: [],
    criteriaError: null,
};

const fetchSuccess = (state, action) => {
    return {
        ...state,
        criterias: action.criterias,
    };
};

const fetchFail = (state, action) => {
    return {
        ...state,
        criteriaError: action.error,
    };
};


const deleteSuccess = (state, action) => {
    const newCriterias = state.criterias.filter((el) => el.id != action.id);
    console.log(newCriterias);
    return {
        ...state,
        criterias: newCriterias,
    };
};

const deleteFail = (state, action) => {
    return {
        ...state,
        criteriaError: action.error,
    };
};

const createSuccess = (state, action) => {
    const newCriteria = action.criteria;
    return {
        ...state,
        criterias: state.criterias.concat(newCriteria),
    };
};

const createFail = (state, action) => {
    return {
        ...state,
        criteriaError: action.error,
    };
};

const updateSucess = (state, action) => {
    const copy = [...state.criterias];
    const index = copy.findIndex((el) => el.id == action.criteria.id);
    copy[index] = action.criteria;
    return {
        ...state,
        criterias: copy,
    };
};

const updateFail = (state, action) => {
    return {
        ...state,
        criteriaError: action.error,
    };
};

const criteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CRITERIA_LIST_SUCCESS:
            return fetchSuccess(state, action);
        case actions.DELETE_CRITERIA_SUCCESS:
            return deleteSuccess(state, action);
        case actions.CREATE_CRITERIA_SUCCESS:
            return createSuccess(state, action);
        case actions.UPDATE_CRITERIA_SUCCESS:
            return updateSucess(state, action);
        case actions.GET_CRITERIA_LIST_FAIL:
            return fetchFail(state, action);
        case actions.DELETE_CRITERIA_FAIL:
            return deleteFail(state, action);
        case actions.CREATE_CRITERIA_FAIL:
            return createFail(state, action);
        case actions.UPDATE_CRITERIA_FAIL:
            return updateFail(state, action);
        default:
            return state;
    }
};

export default criteriaReducer;