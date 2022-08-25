import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,

  } from "../Constants/requestUserConstants";
  import axios from "axios";
  import { URL } from "../url";
   
  // ALL REQUEST
  export const listRequest = () => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_LIST_REQUEST });
  
      const { data } = await axios.get(`${URL}/api/requests`);
  
      dispatch({ type: REQUEST_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          
      if (message === "Not authorized, token failed") {
      }
      dispatch({
        type: REQUEST_LIST_FAIL,
        payload: message,
      });
    }
  };
  
