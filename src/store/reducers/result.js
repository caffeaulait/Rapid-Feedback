import * as actions from '../actions/actions';

const initialState = {
  singleResult: [],
  allResults: [],
  resultError: null,
  reportError: null,
  uploadError: null,
};

const fetchSingleSuccess = (state, action) => {
  return {
    ...state,
    singleResult: action.singleResult,
  };
};

const fetchSingleFail = (state, action) => {
  return {
    ...state,
    resultError: action.error,
  };
};

const fetchAllSuccess = (state, action) => {
  return {
    ...state,
    allResults: action.allResults,
  };
};

const fetchAllFail = (state, action) => {
  return {
    ...state,
    resultError: action.error,
  };
};

const updateSucess = (state, action) => {
  return {
    ...state,
    singleResult: action.singleResult,
  };
};

const updateFail = (state, action) => {
  return {
    ...state,
    resultError: action.error,
  };
};

const sendReportSuccess = (state, action) => {
  return {
    ...state,
  };
};

const sendReportFail = (state, action) => {
  return {
    ...state,
    reportError: action.error,
  };
};

const uploadAudioSuccess = (state, action) => {
  return {
    ...state,
  };
};

const uploadAudioFail = (state, action) => {
  return {
    ...state,
    uploadError: action.error,
  };
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_SINGLE_RESULT_SUCCESS:
      return fetchSingleSuccess(state, action);
    case actions.GET_SINGLE_RESULT_FAIL:
      return fetchSingleFail(state, action);
    case actions.GET_ALL_RESULT_SUCCESS:
      return fetchAllSuccess(state, action);
    case actions.GET_ALL_RESULT_FAIL:
      return fetchAllFail(state, action);
    case actions.UPDATE_RESULT_SUCCESS:
      return updateSucess(state, action);
    case actions.UPDATE_RESULT_FAIL:
      return updateFail(state, action);
    case actions.SEND_REPORT_SUCCESS:
      return sendReportSuccess(state, action);
    case actions.SEND_REPORT_FAIL:
      return sendReportFail(state, action);
    case actions.UPLOAD_AUDIO_SUCCESS:
      return uploadAudioSuccess(state, action);
    case actions.UPLOAD_AUDIO_FAIL:
      return uploadAudioFail(state, action);
    default:
      return state;
  }
};

export default resultReducer;
