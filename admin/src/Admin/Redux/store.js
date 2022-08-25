import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   userCreateReducer,
   userDeleteReducer,
   userEditReducer,
   userUpdateReducer, 
   userListReducer, 
   userLoginReducer 
  } from "./Reducers/userReducers";
import {
  workCreateReducer,
  workDeleteReducer,
  workEditReducer,
  workListReducer,
  workUpdateReducer,
} from "./Reducers/workReducer";
// import {
//   requestListReducer,
// } from "./Reducers/requestReducer";

import {
  requestListReducer,
  userReqCreateReducer,
} from "../../User/Redux/Reducers/requestReducer";

import {
  HeadrequestListReducer,
  headReqDetailsReducer,
  headReqEditReducer,
} from "../../Head/Redux/Reducers/requestReducer";

import {
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  productUpdateReducer,
} from "../../Head/Redux/Reducers/ProductReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate:userCreateReducer,
  userDelete:userDeleteReducer,
  userEdit:userEditReducer,
  userUpdate:userUpdateReducer,
  workCreate: workCreateReducer,
  workDelete:workDeleteReducer,
  workEdit:workEditReducer,
  workList:workListReducer,
  workUpdate:workUpdateReducer,

  requestList:requestListReducer,
  userReqCreate:userReqCreateReducer,

  headrequestList:HeadrequestListReducer,
  headReqDetail:headReqDetailsReducer,
  headReqEdit: headReqEditReducer,

  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  // const workInfoFromLocalStorage = localStorage.getItem("workInfo")
  // ? JSON.parse(localStorage.getItem("workInfo"))
  // : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  // workList:{workInfo:workInfoFromLocalStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
