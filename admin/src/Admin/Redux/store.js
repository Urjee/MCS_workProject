import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

////------------ADMIN REDUCERS
import {
   userCreateReducer,
   userDeleteReducer,
   userEditReducer,
   userUpdateReducer, 
   userListReducer, 
   userLoginReducer,
   userUpdateProfileReducer, 
   userDetailsReducer
  } from "./Reducers/userReducers";

import {
  workListReducer,
} from "./Reducers/workReducer";

import {
  requestListReducer,
  requestCreateReducer,
  requestUpdateReducer,
  reportListReducer,
} from "./Reducers/requestReducer";

///-------------USER REDUCERS

import {
  userReqListReducer,
  userReqCreateReducer,
  
} from "../../User/Redux/Reducers/requestReducer";

///---------------HEAD REDUCERS

import {
  HeadRequestListReducer,
  headReqDetailsReducer,
  headReqEditReducer,
  HeadReportListReducer,
} from "../../Head/Redux/Reducers/requestReducer";

import {
  headUserListReducer,
  addUserReducer,
} from "../../Head/Redux/Reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate:userCreateReducer,
  userDelete:userDeleteReducer,
  userEdit:userEditReducer,
  userUpdate:userUpdateReducer,

  updateRequest:requestUpdateReducer,

  requestCreate:requestCreateReducer,

  userReqList:userReqListReducer,
  userReqCreate:userReqCreateReducer,

  headRequestList:HeadRequestListReducer,
  headReqDetail:headReqDetailsReducer,
  headReqEdit: headReqEditReducer,
  headCreateUser: addUserReducer,

  requestList: requestListReducer,
  workList:workListReducer,

  headUserList: headUserListReducer,
  settings: userDetailsReducer,
  reportList: reportListReducer,
  headReportList: HeadReportListReducer,

  userUpdateProfile: userUpdateProfileReducer,

});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
