import {
    WORK_LIST_FAIL,
    WORK_LIST_REQUEST,
    WORK_LIST_RESET,
    WORK_LIST_SUCCESS,
    WORK_CREATE_FAIL,
    WORK_CREATE_REQUEST,
    WORK_CREATE_RESET,
    WORK_CREATE_SUCCESS,
    WORK_DELETE_FAIL,
    WORK_DELETE_REQUEST,
    WORK_DELETE_SUCCESS,
    WORK_EDIT_FAIL,
    WORK_EDIT_REQUEST,
    WORK_EDIT_SUCCESS,
    WORK_UPDATE_FAIL,
    WORK_UPDATE_REQUEST,
    WORK_UPDATE_RESET,
    WORK_UPDATE_SUCCESS,
  } from "../Constants/workConstants";
  
  // ALL WORK
  export const workListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
      case WORK_LIST_REQUEST:
        return { loading: true };
      case WORK_LIST_SUCCESS:
        return { loading: false, requests: action.payload };
      case WORK_LIST_FAIL:
        return { loading: false, error: action.payload };
      case WORK_LIST_RESET:
        return { requests: [] };
      default:
        return state;
    }
  };
  
  // DELETE WORK
  export const workDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case WORK_DELETE_REQUEST:
        return { loading: true };
      case WORK_DELETE_SUCCESS:
        return { loading: false, success: true, work: action.payload };
      case WORK_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case WORK_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // DELETE CREATE
  export const workCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case WORK_CREATE_REQUEST:
        return { loading: true };
      case WORK_CREATE_SUCCESS:
        return { loading: false, success: true, work: action.payload };
      case WORK_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case WORK_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  // EDIT WORK
  export const workEditReducer = (
    state = { work: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case WORK_EDIT_REQUEST:
        return { ...state, loading: true };
      case WORK_EDIT_SUCCESS:
        return { loading: false, WORK: action.payload };
      case WORK_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  // UPDATE WORK
  export const workUpdateReducer = (state = { work: {} }, action) => {
    switch (action.type) {
      case WORK_UPDATE_REQUEST:
        return { loading: true };
      case WORK_UPDATE_SUCCESS:
        return { loading: false, success: true, work: action.payload };
      case WORK_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case WORK_UPDATE_RESET:
        return { work: {} };
      default:
        return state;
    }
  };
  