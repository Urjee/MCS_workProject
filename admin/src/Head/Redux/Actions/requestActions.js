import {
  REQ_CREATE_SUCCESS,
  REQ_CREATE_REQUEST,
  USERREQ_LIST_FAIL,
  USERREQ_LIST_REQUEST,
  USERREQ_LIST_SUCCESS,
  REPORT_LIST_SUCCESS,
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
} from "../Constants/requestConstants";
import axios from "axios";
import { URLFront } from "../url";
import { logout } from "./userActions";

// ALL REQUEST
export const listRequest = (UserID) => async (dispatch) => {
  try {
    dispatch({ type: USERREQ_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URLFront}/api/headReqs`,
      { UserID },
      config
    );

    dispatch({ type: USERREQ_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
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
      const { impData, stateData } = await axios.post(
        `${URLFront}/api/addUserReq/`,
        { name, importanceName, description, stateName, planTime },
        config
      );
      dispatch({ type: REQ_CREATE_SUCCESS, payload: impData, stateData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
    }
  };
// ALL REQUEST
export const headReport = (organizationID) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/headReport`,
    {organizationID});
    // if(!data && data.length > 0){
    dispatch({ type: REPORT_LIST_SUCCESS, payload: data });
    
    // else {
    //   <h5>data ni</h5>
    // } 
  
    }
    catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REPORT_LIST_FAIL,
      payload: message,
    });
  }
};
