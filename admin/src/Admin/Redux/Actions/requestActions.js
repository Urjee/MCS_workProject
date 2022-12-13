import {
  REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_UPDATE_REQUEST,
  REQUEST_UPDATE_SUCCESS,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
  REPORT_LIST_FAIL,
} from "../Constants/requestConstants";
import axios from "axios";
import { URLFront } from "../url";
import { logout } from "./userActions";


// ALL REQUEST
export const listRequest = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/requests`);

      dispatch({ type: REQUEST_LIST_SUCCESS, payload: data });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());

    }
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload: message,
    });
  }
};
export const totalOrg = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/totalOrganization`);

    dispatch({ type: REQUEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());

    }
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload: message,
    });
  }
};
// ALL REPORT INFO
export const allReport = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/report`);

    dispatch({ type: REPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
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
// ALL REPORT INFO
export const reportAll = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/reports`);

    dispatch({ type: REPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
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
// ALL REQUEST
export const requestProList = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LIST_REQUEST });

    const { data } = await axios.post(`${URLFront}/api/requestProgrammer`);

    dispatch({ type: REQUEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload: message,
    });
  }
};

export const requestUpdate =
  (planTime, realTime, startDate, endDate, DeveloperID, percentOfPerform) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${URLFront}/api/requestUpdate/`,
        {
          planTime,
          realTime,
          startDate,
          endDate,
          DeveloperID,
          percentOfPerform,
        },
        config
      );
      dispatch({ type: REQUEST_UPDATE_SUCCESS, payload: data });
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
