import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./Admin/screens/HomeScreen";
import Login from "./Admin/screens/LoginScreen";

import UsersScreen from "./Admin/screens/UsersScreen";
import UserAddMain from "./Admin/screens/UserAddMain";
import NotFound from "./Admin/screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import {listWork} from "./Admin/Redux/Actions/workActions";
// import {listUsers} from "./Redux/Actions/userActions";

import RequestScreen from "./Admin/screens/RequestScreen";
import WorkScreen from "./Admin/screens/WorkScreen";
import HeadScreen from "./Head/screens/HeadScreen";
// import RequestUserScreen from "./Head/screens/RequestUserScreen"
// ;
import userRequestScreen from "./Head/screens/userRequestScreen";
import userReqDetailScreen from "./Head/screens/userReqDetailScreen";

import UserReq from "./User/screens/AddReqUser";
import UserReqCreate from "./User/screens/UserReqCreate";
import ProductEditScreen from "./Head/screens/ProductEditScreen";
import ProductScreen from "./Head/screens/productScreen";
import MainRequests from "./User/components/UserReq/MainRequests";
function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listWork());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/requests" component={RequestScreen} />
          <PrivateRouter path="/works" component={WorkScreen} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/addUser" component={UserAddMain}/>
          <PrivateRouter path="/head" component={HeadScreen}/>
          {/* <PrivateRouter path="/requestUser" component={RequestUserScreen} /> */}
          <Route path="/product/:id/edit" component={ProductEditScreen} />
          <Route path="/products" component={ProductScreen} />

          <PrivateRouter path="/addUserReq" component={UserReq}/>
          <PrivateRouter path="/userReqs" component={MainRequests} />
          <PrivateRouter path="/userReq" component={userReqDetailScreen} />

          {/* <PrivateRouter path='/userReqsuser' component={MainRequests}/> */}
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
         
        </Switch>
      </Router>
    </>
  );
}

export default App;
