import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,

    USERREQ_CREATE_REQUEST,
    USERREQ_CREATE_SUCCESS,

  } from "../Constants/requestConstants";
  import axios from "axios";
  import { URL } from "../url";
  import {useEffect, useState} from "react";
   
  // ALL REQUEST
  export const listRequest = () => async (dispatch) => {

    try {
      dispatch({ type: REQUEST_LIST_REQUEST });

      const { impData } = await axios.get(`${URL}/api/userReqs`)


      dispatch({ type: REQUEST_LIST_SUCCESS, payload: impData });
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
  
// CREATE USERREQ
export const createUserReq =
(name, organizationName, subWordID, importanceName, planTime, file_name, description) =>
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

      const { impData } = await axios.post(
        `${URL}/api/addUserReq/`,
        {name, organizationName, subWordID, importanceName, planTime, file_name, description},
        config
      );

      dispatch({ type: USERREQ_CREATE_SUCCESS, payload: impData });
    } catch (error) {
      const message =

        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
      }
     
    }
  };
