import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  workRequestListReducer,
  workRequestsDeleteReducer,
  workRequestsCreateReducer,
} from "./Reducers/workRequestReducers";
import {
  WorkUserListReducer,
  workUserDeleteReducer,
  workUserCreateReducer,
  workEditReducer,
  workUserUpdateReducer,

} from "./Reducers/workUserReducer.js";
import {
  requestListReducer,
  userReqCreateReducer,
} from "./Reducers/requestReducer";

const reducer = combineReducers({
  workUserCreate: workUserCreateReducer,
  workUserDelete: workUserDeleteReducer,
  workUserEdit: workEditReducer,
  workUserUpdate: workUserUpdateReducer,
  workUserList: WorkUserListReducer,

  workRequestCreate:workRequestsCreateReducer,
  workRequestDelete: workRequestsDeleteReducer,
  workRequestList: workRequestListReducer,
  
  requestList:requestListReducer,

  userReqCreate:userReqCreateReducer,

});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const storee = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default storee;
