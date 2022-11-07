import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,
    REQUEST_CREATE_FAIL,
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_RESET,
    REQUEST_CREATE_SUCCESS,
    REQUEST_UPDATE_REQUEST,
    REQUEST_UPDATE_SUCCESS,
    REQUEST_UPDATE_FAIL,
    REQUEST_UPDATE_RESET,
  } from "../Constants/requestConstants";
  
  // ALL REQUEST
  export const requestListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
      case REQUEST_LIST_REQUEST:
        return { loading: true };
      case REQUEST_LIST_SUCCESS:
        return { loading: false, requests: action.payload };
      case REQUEST_LIST_FAIL:
        return { loading: false, error: action.payload };
      case REQUEST_LIST_RESET:
        return { requests: [] };
      default:
        return state;
    }
  };

      //  CREATE
export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { loading: true };
    case REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, requests: action.payload };
    case REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// UPDATE USER
export const requestUpdateReducer = (state = { requests: {} }, action) => {
  switch (action.type) {
    case REQUEST_UPDATE_REQUEST:
      return { loading: true };
    case REQUEST_UPDATE_SUCCESS:
      return { loading: false, success: true, requests: action.payload };
    case REQUEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_UPDATE_RESET:
      return { requests: {} };
    default:
      return state;
  }
};
  