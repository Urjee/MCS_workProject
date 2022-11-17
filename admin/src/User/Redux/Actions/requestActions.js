import {
  USERREQ_LIST_FAIL,
  USERREQ_LIST_REQUEST,
  USERREQ_LIST_SUCCESS,
  USERREQ_CREATE_REQUEST,
  USERREQ_CREATE_SUCCESS,
  USERREQ_DELETE_REQUEST,
  USERREQ_DELETE_SUCCESS,
} from "../Constants/requestConstants";
import axios from "axios";
import { URLFront } from "../url";

// ALL REQUEST
export const listRequest = (UserID) => async (dispatch) => {
  try {
    dispatch({ type: USERREQ_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/userReqs`, { UserID });

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

// CREATE USERREQ
export const addUserReq =
  (name, importanceID, description, orgID, file_id, stateID, createDate) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USERREQ_CREATE_REQUEST });
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
        {
          name,
          importanceID,
          description,
          orgID,
          file_id,
          stateID,
          createDate,
        },
        config
      );
      dispatch({ type: USERREQ_CREATE_SUCCESS, payload: impData, stateData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
      }
    }
  };
// DELETE USERREQ
export const deleteUserReq = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERREQ_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { userReqID } = await axios.delete(
      `${URLFront}/api/deleteUserReq/`,
      { userReqID },
      config
    );
    dispatch({ type: USERREQ_DELETE_SUCCESS, payload: userReqID });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
  }
};
