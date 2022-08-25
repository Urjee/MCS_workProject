import {
    WORKUSER_LIST_FAIL,
    WORKUSER_LIST_REQUEST,
    WORKUSER_LIST_RESET,
    WORKUSER_LIST_SUCCESS,
    WORKUSER_CREATE_FAIL,
    WORKUSER_CREATE_REQUEST,
    WORKUSER_CREATE_RESET,
    WORKUSER_CREATE_SUCCESS,
    WORKUSER_DELETE_FAIL,
    WORKUSER_DELETE_REQUEST,
    WORKUSER_DELETE_SUCCESS,
    WORKUSER_EDIT_FAIL,
    WORKUSER_EDIT_REQUEST,
    WORKUSER_EDIT_SUCCESS,
    WORKUSER_UPDATE_FAIL,
    WORKUSER_UPDATE_REQUEST,
    WORKUSER_UPDATE_RESET,
    WORKUSER_UPDATE_SUCCESS,
  } from "../Constants/workUserConstants";
  
  // ALL WORKUSER
  export const WorkUserListReducer = (state = { workUsers: [] }, action) => {
    switch (action.type) {
      case WORKUSER_LIST_REQUEST:
        return { loading: true };
      case WORKUSER_LIST_SUCCESS:
        return { loading: false, workUsers: action.payload };
      case WORKUSER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case WORKUSER_LIST_RESET:
        return { workUsers: [] };
      default:
        return state;
    }
  };
  
  // DELETE WORKUSER
  export const workUserDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case WORKUSER_DELETE_REQUEST:
        return { loading: true };
      case WORKUSER_DELETE_SUCCESS:
        return { loading: false, success: true, workUser: action.payload };
      case WORKUSER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case WORKUSER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  //  CREATE
  export const workUserCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case WORKUSER_CREATE_REQUEST:
        return { loading: true };
      case WORKUSER_CREATE_SUCCESS:
        return { loading: false, success: true, workUser: action.payload };
      case WORKUSER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case WORKUSER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  // EDIT WORKUSER
  export const workEditReducer = (
    state = { workUser: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case WORKUSER_EDIT_REQUEST:
        return { ...state, loading: true };
      case WORKUSER_EDIT_SUCCESS:
        return { loading: false, workUser: action.payload };
      case WORKUSER_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE WORKUSER
  export const workUserUpdateReducer = (state = { workUser: {} }, action) => {
    switch (action.type) {
      case WORKUSER_UPDATE_REQUEST:
        return { loading: true };
      case WORKUSER_UPDATE_SUCCESS:
        return { loading: false, success: true, workUser: action.payload };
      case WORKUSER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case WORKUSER_UPDATE_RESET:
        return { workUser: {} };
      default:
        return state;
    }
  };
  