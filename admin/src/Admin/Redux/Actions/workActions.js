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
     