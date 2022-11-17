import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import rootReducer from './reducers'
////------------ADMIN REDUCERS
import {
  userCreateReducer,
  userDeleteReducer,
  userEditReducer,
  userUpdateReducer,
  userListReducer,
  userLoginReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
} from "./Reducers/userReducers";

import { workListReducer } from "./Reducers/workReducer";

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
  auth: () => ({ mock: true }),
    form: persistReducer(
      {
        key: "form", // key for localStorage key, will be: "persist:form"
        storage,
        debug: true,
        blacklist: ['foo'],
      },
      userLoginReducer,
      userListReducer,
      userCreateReducer,
      userEditReducer,
      userUpdateReducer,
      requestUpdateReducer,
      requestCreateReducer,
      userReqListReducer,
      userReqCreateReducer,
      HeadRequestListReducer,
      headReqEditReducer,
      addUserReducer,
      requestListReducer,
      workListReducer,
      headUserListReducer,
      userDetailsReducer,
      reportListReducer,
      HeadReportListReducer,
      userUpdateProfileReducer
    ),
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  userUpdate: userUpdateReducer,

  updateRequest: requestUpdateReducer,

  requestCreate: requestCreateReducer,

  userReqList: userReqListReducer,
  userReqCreate: userReqCreateReducer,

  headRequestList: HeadRequestListReducer,
  headReqDetail: headReqDetailsReducer,
  headReqEdit: headReqEditReducer,
  headCreateUser: addUserReducer,

  requestList: requestListReducer,
  workList: workListReducer,

  headUserList: headUserListReducer,
  settings: userDetailsReducer,
  reportList: reportListReducer,
  headReportList: HeadReportListReducer,

  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const persistedReducer = persistReducer(persistConfig, reducer)

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];
// const store = createStore(
//   reducer,
//   initialState,
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
const store = createStore(persistReducer({
  key: "root",
  debug: true,
  storage,
  whitelist: ['auth'],
}, reducer), initialState, composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store, null, () => {
  console.log("restoredState", store.getState());
})

export {
  persistor,
  store
}

