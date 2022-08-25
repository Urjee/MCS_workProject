import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,

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

  