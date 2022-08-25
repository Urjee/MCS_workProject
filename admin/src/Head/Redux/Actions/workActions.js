import {
    WORKUSER_LIST_REQUEST,
    WORKUSER_LIST_SUCCESS,
    WORKUSER_LIST_FAIL,
    WORKUSER_DELETE_REQUEST, 
    WORKUSER_DELETE_SUCCESS ,
    WORKUSER_DELETE_FAIL,
    WORKUSER_CREATE_REQUEST ,
    WORKUSER_CREATE_SUCCESS ,
    WORKUSER_EDIT_REQUEST,
    WORKUSER_EDIT_SUCCESS,
    WORKUSER_EDIT_FAIL,
    WORKUSER_UPDATE_REQUEST,
    WORKUSER_UPDATE_SUCCESS,
    WORKUSER_UPDATE_FAIL,
  } from "../Constants/workConstants";
  import axios from "axios";
  import { URL } from "../url";
  
  // ALL WORKUSER
  export const listWorkUser = () => async (dispatch) => {
    try {
      dispatch({ type: WORKUSER_LIST_REQUEST });
  
      const { data } = await axios.get(`${URL}/api/workUsers`);
  
      dispatch({ type: WORKUSER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
      }
      dispatch({
        type: WORKUSER_LIST_FAIL,
        payload: message,
      });
      
    }
  };
  
  // DELETE WORKUSER
  export const deleteWorkUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: WORKUSER_DELETE_REQUEST });
  
      const {
        workUserLogin: {workUserInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${workUserInfo.token}`,
        },
      };
  
      await axios.delete(`${URL}/api/workUsers/${id}`, config);
  
      dispatch({ type: WORKUSER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch({
          type: WORKUSER_DELETE_FAIL,
          payload: message,
        });      }
     
    }
  };
  // CREATE WORKUSER
  export const createWorkUser =
    ( name, organizationID, subWorkID, importance_id, planTime, file) =>
    async (dispatch) => {
      try {
        dispatch({ type: WORKUSER_CREATE_REQUEST });
  
        const { data } = await axios.post(
          `${URL}/api/addWorkUser/`,
          { name, organizationID, subWorkID, importance_id, planTime, file},
          
        );
  
        dispatch({ type: WORKUSER_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
         
        }
      }
    };
  
  
  // EDIT WORKUSER
  export const editWorkUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: WORKUSER_EDIT_REQUEST });
      const { data } = await axios.post(`${URL}/api/workUsers/${id}`);
      dispatch({ type: WORKUSER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());

      }
      dispatch({
        type: WORKUSER_EDIT_FAIL,
        payload: message,
      });
    }
  };
  
  // UPDATE WORKUSER
  export const updateWorkUser = (workUser) => async (dispatch) => {
    try {
      dispatch({ type: WORKUSER_UPDATE_REQUEST });
    
      const { data } = await axios.put(
        `${URL}/api/workUsers/${workUser._id}`,
        workUser
      );
  
      dispatch({ type: WORKUSER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: WORKUSER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
  
      }
      dispatch({
        type: WORKUSER_UPDATE_FAIL,
        payload: message,
      });
    }
}