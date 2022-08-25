import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,
    USERREQ_DETAILS_FAIL,
    USERREQ_DETAILS_SUCCESS,
    USERREQ_DETAILS_REQUEST,
    USERREQ_EDIT_REQUEST,
    USERREQ_EDIT_SUCCESS,
    USERREQ_EDIT_FAIL,
    USERREQ_EDIT_RESET,

  } from "../Constants/requestConstants";
  
  // ALL REQUEST
  export const HeadrequestListReducer = (state = { requests: [] }, action) => {
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

  //REQUEST DETAILS
  export const headReqDetailsReducer=(
    state={ loading: true, reqItems: [] },
    action
  )=>{
    switch (action.type){
      case USERREQ_DETAILS_REQUEST:
        return {...state, loading: true };
      case USERREQ_DETAILS_SUCCESS:
        return {loading: false, requests: action.payload }
      case USERREQ_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state;

    }
  };
  
  //REQUEST EDIT
  export const headReqEditReducer=( 
    state={ requests: { reviews: [] } },
     action
     ) => {
    switch (action.type){
      case USERREQ_EDIT_REQUEST:
        return { ...state, loading: true };
      case USERREQ_EDIT_SUCCESS:
        return {loading: false, requests: action.payload }
      case USERREQ_EDIT_FAIL:
        return { loading: false, error: action.payload }
      case USERREQ_EDIT_RESET:
        return { request: {} };
      default:
        return state;

    }
  };
  
