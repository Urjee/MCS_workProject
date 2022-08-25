import {
    WORKREQUEST_CREATE_REQUEST,
    WORKREQUEST_CREATE_SUCCESS,
    WORKREQUEST_LIST_FAIL,
    WORKREQUEST_LIST_REQUEST,
    WORKREQUEST_LIST_SUCCESS,
    WORKREQUEST_DELETE_FAIL,
    WORKREQUEST_DELETE_REQUEST,
    WORKREQUEST_DELETE_SUCCESS,

  } from "../Constants/workRequestConstants";
  import axios from "axios";
  import { URL } from "../url";
  
  // ALL WORKREQUEST
  export const listWorkRequest = () => async (dispatch) => {
    try {
      dispatch({ type: WORKREQUEST_LIST_REQUEST });
      
      const { data } = await axios.get(`${URL}/api/workRequests`);
  
      dispatch({ type: WORKREQUEST_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: WORKREQUEST_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  // DELETE WORKREQUEST
  export const deleteWorkRequest = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: WORKREQUEST_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`${URL}/api/workRequests/${id}`, config);
  
      dispatch({ type: WORKREQUEST_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: WORKREQUEST_DELETE_FAIL,
        payload: message,
      });
    }
  };
  // CREATE WORKREQUEST
  export const createWorkRequest =
    (name, organizationID, importanceID, planTime, subWorkID, file_id, description) =>
    async (dispatch, getState) => {
      try {
        dispatch({ type: WORKREQUEST_CREATE_REQUEST });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // const { dataa }=await axios.post(
        //   `${URL}/api/files/`,
        //   {file_id, file_name, original_name, file_path},
        //   config
        // ); 
        // dispatch({ type: WORKREQUEST_CREATE_SUCCESS, payload: dataa });

        const { data } = await axios.post(
          `${URL}/api/addWorkRequests/`,
          {name, organizationID, importanceID, planTime, subWorkID, file_id, description },
          config
        );
  
        dispatch({ type: WORKREQUEST_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
  
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
        }
       
      }
    };
  
 