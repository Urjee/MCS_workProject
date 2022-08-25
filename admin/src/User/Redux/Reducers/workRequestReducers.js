import {
    WORKREQUEST_LIST_FAIL,
    WORKREQUEST_LIST_REQUEST,
    WORKREQUEST_LIST_RESET,
    WORKREQUEST_LIST_SUCCESS,
    WORKREQUEST_CREATE_FAIL,
    WORKREQUEST_CREATE_REQUEST,
    WORKREQUEST_CREATE_RESET,
    WORKREQUEST_CREATE_SUCCESS,
    WORKREQUEST_DELETE_FAIL,
    WORKREQUEST_DELETE_REQUEST,
    WORKREQUEST_DELETE_SUCCESS,

  } from "../Constants/workRequestConstants.js";
  
  // ALL workRequest
  export const workRequestListReducer = (state = { workRequests: [] }, action) => {
    switch (action.type) {
      case WORKREQUEST_LIST_REQUEST:
        return { loading: true };
      case WORKREQUEST_LIST_SUCCESS:
        return { loading: false, workRequests: action.payload };
      case WORKREQUEST_LIST_FAIL:
        return { loading: false, error: action.payload };
      case WORKREQUEST_LIST_RESET:
        return { workRequests: [] };
      default:
        return state;
    }
  };
  
  // DELETE workRequest
  export const workRequestsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case WORKREQUEST_DELETE_REQUEST:
        return { loading: true };
      case WORKREQUEST_DELETE_SUCCESS:
        return { loading: false, success: true, workRequests: action.payload };
      case WORKREQUEST_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case WORKREQUEST_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  //  CREATE workRequest
  export const workRequestsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case WORKREQUEST_CREATE_REQUEST:
        return { loading: true };
      case WORKREQUEST_CREATE_SUCCESS:
        return { loading: false, success: true, workRequests: action.payload };
      case WORKREQUEST_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case WORKREQUEST_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
 