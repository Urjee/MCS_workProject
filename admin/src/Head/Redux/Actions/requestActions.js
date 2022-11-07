import {
  REQ_CREATE_SUCCESS,
  REQ_CREATE_REQUEST,
  USERREQ_LIST_FAIL,
  USERREQ_LIST_REQUEST,
  USERREQ_LIST_SUCCESS,

  } from "../Constants/requestConstants";
  import axios from "axios";
  import { URLFront } from "../url";
   
  // ALL REQUEST
  export const listRequest = (UserID) => async (dispatch) => {
    try {
      dispatch({ type: USERREQ_LIST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };
      const { data } = await axios.post(`${URLFront}/api/headReqs`,
      { UserID },config);
  
      dispatch({ type: USERREQ_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        
      }
      dispatch({
        type: USERREQ_LIST_FAIL,
        payload: message,
      });
    }
  };
 // CREATE REQUEST
export const createHeadReq =
(name, importanceName, description, stateName, planTime) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REQ_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { impData , stateData} = await axios.post(
        `${URLFront}/api/addUserReq/`,
        {name, importanceName, description, stateName, planTime},
        config
      );
      dispatch({ type: REQ_CREATE_SUCCESS,
                 payload: impData,
                 stateData
              });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
      }
    }
  };
