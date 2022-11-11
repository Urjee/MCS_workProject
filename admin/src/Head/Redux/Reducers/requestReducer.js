import {
    USERREQ_LIST_FAIL,
    USERREQ_LIST_REQUEST,
    USERREQ_LIST_SUCCESS,
    USERREQ_LIST_RESET,
    USERREQ_DETAILS_FAIL,
    USERREQ_DETAILS_SUCCESS,
    USERREQ_DETAILS_REQUEST,
    USERREQ_EDIT_REQUEST,
    USERREQ_EDIT_SUCCESS,
    USERREQ_EDIT_FAIL,
    USERREQ_EDIT_RESET,
    REPORT_LIST_SUCCESS,
    REPORT_LIST_FAIL,
    REPORT_LIST_REQUEST,
    REPORT_LIST_RESET,

  } from "../Constants/requestConstants";
  
  // ALL REQUEST
  export const HeadRequestListReducer = (state = { headReqs: [] }, action) => {
    switch (action.type) {
      case USERREQ_LIST_REQUEST:
        return { loading: true };
      case USERREQ_LIST_SUCCESS:
        return { loading: false, headReqs: action.payload };
      case USERREQ_LIST_FAIL:
        return { loading: false, error: action.payload };
      case USERREQ_LIST_RESET:
        return  { headReqs: [] } ;
      default:
        return state;
    }
  };
  // ALL REPORT
  export const HeadReportListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
      case REPORT_LIST_REQUEST:
        return { loading: true };
      case REPORT_LIST_SUCCESS:
        return { loading: false, requests: action.payload };
      case REPORT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case REPORT_LIST_RESET:
        return  { requests: [] } ;
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
  
