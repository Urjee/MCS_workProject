import {
    WORK_LIST_REQUEST,
    WORK_LIST_SUCCESS,
    WORK_LIST_FAIL,
  } from "../Constants/workConstants";
  import axios from "axios";
  import { URLFront } from "../url";
  
  
  // ALL WORK
  export const listWork = () => async (dispatch) => {
    try {
      dispatch({ type: WORK_LIST_REQUEST });
      const { data } = await axios.post(`${URLFront}/api/adminReqs`);
      dispatch({ type: WORK_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
      }
      dispatch({
        type: WORK_LIST_FAIL,
        payload: message,
      });
    }
  };
    // ALL REQ
    export const listReq = () => async (dispatch) => {
      try {
        dispatch({ type: WORK_LIST_REQUEST });
        const { data } = await axios.post(`${URLFront}/api/adminReqsPro`);
        dispatch({ type: WORK_LIST_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
        }
        dispatch({
          type: WORK_LIST_FAIL,
          payload: message,
        });
      }
    };
      // const { data } = async () => {
      //   await fetch('http://localhost:8080/api/adminReqs',{
      //     method: "POST",
      //     body: JSON.stringify({
      //       userReqID: reqID * 1,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   });
      // }
  
   
  // // DELETE WORK
  // export const deleteWork = (id) => async (dispatch, getState) => {
  //   try {
  //     dispatch({ type: WORK_DELETE_REQUEST });
  
  //     const {
  //       workLogin: { workInfo },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${workInfo.token}`,
  //       },
  //     };
  
  //     await axios.delete(`${URL}/api/works/${id}`, config);
  
  //     dispatch({ type: WORK_DELETE_SUCCESS });
  //   } catch (error) {
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     if (message === "Not authorized, token failed") {
  //       dispatch({
  //         type: WORK_DELETE_FAIL,
  //         payload: message,
  //       });      }
     
  //   }
  // };
  // // CREATE WORK
  // export const createWork =
  //   (code, name, organizationID, create_user, date, performedTime, importance_id, stateID, planTime, realTime, execution_worker) =>
  //   async (dispatch, getState) => {
  //     try {
  //       dispatch({ type: WORK_CREATE_REQUEST });
  
  //       const {
  //         WorkLogin: { WorkInfo },
  //       } = getState();
  
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${WorkInfo.token}`,
  //         },
  //       };
  
  //       const { data } = await axios.post(
  //         `${URL}/api/works/`,
  //         {code, name, organizationID, create_user, date, performedTime, importance_id, stateID, planTime, realTime, execution_worker},
  //         config
  //       );
  
  //       dispatch({ type: WORK_CREATE_SUCCESS, payload: data });
  //     } catch (error) {
  //       const message =
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message;
  //       if (message === "Not authorized, token failed") {
         
  //       }
  //     }
  //   };
  
  
  // // EDIT WORK
  // export const editWork = (id) => async (dispatch) => {
  //   try {
  //     dispatch({ type: WORK_EDIT_REQUEST });
  //     const { data } = await axios.get(`${URL}/api/works/${id}`);
  //     dispatch({ type: WORK_EDIT_SUCCESS, payload: data });
  //   } catch (error) {
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     if (message === "Not authorized, token failed") {
        
  //     }
  //   }
  // };
  
  // // UPDATE WORK
  // export const updateWork = (work) => async (dispatch, getState) => {
  //   try {
  //     dispatch({ type: WORK_UPDATE_REQUEST });
  
  //     const {
  //       WorkLogin: { WorkInfo },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${WorkInfo.token}`,
  //       },
  //     };
  
  //     const { data } = await axios.put(
  //       `${URL}/api/works/${work._id}`,
  //       work,
  //       config
  //     );
  
  //     dispatch({ type: WORK_UPDATE_SUCCESS, payload: data });
  //     dispatch({ type: WORK_EDIT_SUCCESS, payload: data });
  //   } catch (error) {
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     if (message === "Not authorized, token failed") {
  
  //     }
  //   }
  