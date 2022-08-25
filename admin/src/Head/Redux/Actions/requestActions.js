import {
    REQUEST_LIST_FAIL,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,
    USERREQ_DETAILS_FAIL,
    USERREQ_DETAILS_REQUEST,
    USERREQ_DETAILS_SUCCESS,
    USERREQ_EDIT_FAIL,
    USERREQ_EDIT_REQUEST,
    USERREQ_EDIT_SUCCESS,
  } from "../Constants/requestConstants";
  import axios from "axios";
  import { URL } from "../url";
   
  // ALL REQUEST
  export const listRequest = () => async (dispatch) => {
    try {
      dispatch({ type: REQUEST_LIST_REQUEST });
  
      const { data } = await axios.get(`${URL}/api/userReqs`);
  
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
 
  // //REQ DETAILS
  // export const getUserReqDetails=(id)=>async(dispatch, getState)=>{
  //   try{
  //     dispatch({ type: USERREQ_DETAILS_REQUEST});

  //     const{
  //       userLogin: {userInfo },
  //     }= getState();
  //     const config ={
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  //     const {data}= await axios.get(`/api/userReqs/${id}`, config);
  //     dispatch({ type: USERREQ_DETAILS_SUCCESS, payload: data});

  //   } catch( error) {
  //     const message=
  //     error.response && error.response.data.message
  //     ? error. response.data.message
  //     : error.message;
  //     if(message==="Not authorized, token failed"){
  //     }
  //     dispatch({
  //       type: USERREQ_DETAILS_FAIL,
  //       payload: message,
  //     });
  //   }
  // };

    //REQ EDIT
    export const getUserReqEdit=(id)=>async(dispatch)=>{
      try{
        dispatch({ type: USERREQ_EDIT_REQUEST});

        const {data}= await axios.get(`/api/userReqs/${id}`);
        dispatch({ type: USERREQ_EDIT_SUCCESS, payload: data});
  
      } catch( error) {
        const message=
        error.response && error.response.data.message
        ? error. response.data.message
        : error.message;
        if(message==="Not authorized, token failed"){
        }
        dispatch({
          type: USERREQ_EDIT_FAIL,
          payload: message,
        });
      }
    };