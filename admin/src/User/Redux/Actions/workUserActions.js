import {
    WORKUSER_CREATE_REQUEST ,
    WORKUSER_CREATE_SUCCESS ,
    WORKUSER_LIST_REQUEST,
    WORKUSER_LIST_SUCCESS,
    WORKUSER_LIST_FAIL,
    WORKUSER_DELETE_REQUEST, 
    WORKUSER_DELETE_SUCCESS ,
    WORKUSER_DELETE_FAIL,
    WORKUSER_EDIT_REQUEST,
    WORKUSER_EDIT_SUCCESS,
    WORKUSER_EDIT_FAIL,
    WORKUSER_UPDATE_REQUEST,
    WORKUSER_UPDATE_SUCCESS,
    WORKUSER_UPDATE_FAIL,
    // WORKUSER_DETAILS_REQUEST ,
    // WORKUSER_DETAILS_SUCCESS,
    // WORKUSER_DETAILS_FAIL,
    USER_LOGOUT,
  } from "../Constants/workUserConstants";
  import axios from "axios";
  import { URL } from "../url";
  
  // LOGOUT
export const logout = () => (dispatch)=> {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

};
  // ALL WORKUSER
  export const listWorkUser = () => async (dispatch,getState) => {
    try {
      dispatch({ type: WORKUSER_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${URL}/api/workUsers`, config);
  
      dispatch({ type: WORKUSER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          if (message === "Not authorized, token failed") {
            dispatch(logout());
          }
          dispatch({
            type: WORKUSER_LIST_FAIL,
            payload: message,
          });
    }
  };
  
  // DELETE WORKUSER
  export const deleteWorkUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: WORKUSER_DELETE_REQUEST });
  
      const {
        userLogin: {userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`${URL}/api/workUsers/${id}`, config);
  
      dispatch({ type: WORKUSER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
        dispatch({
          type: WORKUSER_DELETE_FAIL,
          payload: message,
        });
       }
  };
  // CREATE WORKUSER
  export const createWorkUser =
    ( workUser_id, name, organizationID, subWorkID, importance_id, planTime, file) =>
    async (dispatch, getState) => {
      try {
        dispatch({ type: WORKUSER_CREATE_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        
        
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
        const { data } = await axios.post(
          `${URL}/api/addWorkUser/`,
          { workUser_id, name, organizationID, subWorkID, importance_id, planTime, file},
          config
        );
  
        dispatch({ type: WORKUSER_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =

          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
         
        }
      }
    };
  // ////FILE DATABASE
  // export const saveFile=
  // (file_id, file_name, original_name, file_path)=>
  // async (dispatch, getState)=>{
  //   try{
  //     dispatch(saveFile());
  //   const {data}=await axios.post(
  //     `${URL}/api/uploadFile`,
  //     {file_id, file_name, original_name, file_path}
  //     )
  //    }
  //     catch(error){
  //       const message=
  //       error.response && error.response.data.message
  //       ? error.response.data.message
  //       : error.message;
  //     }
  // }

  
  // EDIT WORKUSER
  export const editWorkUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: WORKUSER_EDIT_REQUEST });
      const { data } = await axios.post(`${URL}/api/workUsers/${id}`);
      dispatch({ type: WORKUSER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: WORKUSER_EDIT_FAIL,
        payload: message,
      });
    }
  };
  
  // UPDATE WORKUSER
  export const updateWorkUser = (workUser) => async (dispatch,getState) => {
    try {
      dispatch({ type: WORKUSER_UPDATE_REQUEST });
      
      const {
        userLogin: { userInfo },
      } = getState();
      
      const config={
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/api/workUsers/${workUser._id}`,
        workUser,
        config
      );
  
      dispatch({ type: WORKUSER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: WORKUSER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: WORKUSER_UPDATE_FAIL,
        payload: message,
      });
    }
};