import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_RESET,
    REQUEST_LIST_SUCCESS,
    REQUEST_CREATE_FAIL,
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_RESET,
    REQUEST_CREATE_SUCCESS,
    REQUEST_UPDATE_REQUEST,
    REQUEST_UPDATE_SUCCESS,
    REQUEST_UPDATE_FAIL,
    REQUEST_UPDATE_RESET,
  } from "../Constants/requestConstants";
  import axios from "axios";
  import { URLFront} from "../url";
   
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
      }
      dispatch({
        type: REQUEST_LIST_FAIL,
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
        }
        dispatch({
          type: REQUEST_LIST_FAIL,
          payload: message,
        });
      }
    };
    
export const requestUpdate =  ( planTime, realTime, startDate, endDate, DeveloperID, percentOfPerform) =>
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
      { planTime, realTime, startDate, endDate, DeveloperID, percentOfPerform },
      config
    );
    dispatch({ type: REQUEST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =

      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
   
  }
};

// UPDATE REQUEST
// export const requestUpdate = (requests) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: REQUEST_UPDATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.put(
//       `${URL}/api/requestUpdate`,
//       requests,
//       config
//     );

//     dispatch({ type: REQUEST_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch();
//     }
//     dispatch({
//       type: REQUEST_UPDATE_FAIL,
//       payload: message,
//     });
//   }
// };