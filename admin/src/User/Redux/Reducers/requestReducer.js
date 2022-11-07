import {
    USERREQ_LIST_FAIL,
    USERREQ_LIST_REQUEST,
    USERREQ_LIST_RESET,
    USERREQ_LIST_SUCCESS,
    USERREQ_CREATE_FAIL,
    USERREQ_CREATE_RESET,
    USERREQ_CREATE_SUCCESS,
    USERREQ_CREATE_REQUEST,
    USERREQ_DETAILS_REQUEST,
    USERREQ_DETAILS_SUCCESS,
    USERREQ_DETAILS_FAIL,
    USERREQ_DETAILS_RESET,
    USERREQ_DELETE_RESET,
    USERREQ_DELETE_REQUEST,
    USERREQ_DELETE_SUCCESS,
    USERREQ_DELETE_FAIL,
  } from "../Constants/requestConstants";
  
  // ALL REQUEST
  export const userReqListReducer = (state = { userReqs: [] }, action) => {
    switch (action.type) {
      case USERREQ_LIST_REQUEST:
        return { loading: true };
      case USERREQ_LIST_SUCCESS:
        return { loading: false, userReqs: action.payload };
      case USERREQ_LIST_FAIL:
        return { loading: false, error: action.payload };
      case USERREQ_LIST_RESET:
        return { userReqs: [] };
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
      return { loading: false, success: true, userReqs: action.payload };
    case USERREQ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USERREQ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

    //  DELETE
    export const userReqDeleteReducer = (state = {}, action) => {
      switch (action.type) {
        case USERREQ_DELETE_REQUEST:
          return { loading: true };
        case USERREQ_DELETE_SUCCESS:
          return { loading: false, success: true, userReqs: action.payload };
        case USERREQ_DELETE_FAIL:
          return { loading: false, error: action.payload };
        case USERREQ_DELETE_RESET:
          return {};
        default:
          return state;
      }
    };
    