import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,
    USERREQ_CREATE_FAIL,
    USERREQ_CREATE_RESET,
    USERREQ_CREATE_SUCCESS,
    USERREQ_CREATE_REQUEST,
    USERREQ_DETAILS_REQUEST,
    USERREQ_DETAILS_SUCCESS,
    USERREQ_DETAILS_FAIL,
    USERREQ_DETAILS_RESET,

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
export const userReqCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USERREQ_CREATE_REQUEST:
      return { loading: true };
    case USERREQ_CREATE_SUCCESS:
      return { loading: false, success: true, requests: action.payload };
    case USERREQ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USERREQ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

