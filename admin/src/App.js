import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./Admin/screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "./Admin/screens/HomeScreen";
import Login from "./Admin/screens/LoginScreen";
import UsersScreen from "./Admin/screens/UsersScreen";
import RequestScreen from "./Admin/screens/RequestScreen";
import UserReqScreen from "./User/screens/UserReqScreen"
import AddReqUser from "./User/screens/AddReqUser";
import UserReqDetail from "./User/screens/UserReqDetail";
import RequestHeadSrcn from "./Head/screens/RequestHeadScrn";
import ReqAdminScreen from "./Admin/screens/ReqAdminScreen"
import HeadReqDetailScreen from "./Head/screens/HeadReqDetailScreen";
import HeadUser from "./Head/screens/HeadUser"
import AddUser from "./Head/screens/AddUser";
import CreateUser from "./Admin/screens/CreateUser"
import RequestDetails from "./Admin/screens/RequestDetails";
import ReqAdminEditScreen from "./Admin/screens/ReqAdminEditScreen";
import UserEditt from "./Admin/screens/UserEditt";
import EditHeadUser from "./Head/screens/EditHeadUser";
import ProRequest from "./Admin/screens/ProRequest";
import ProRequestEdit from "./Admin/screens/ProRequestEdit";
import ProReqAdminScrn from "./Admin/screens/ProReqAdminScrn";
import ProAdminEditScrn from "./Admin/screens/ProAdminEditScrn";
import AddHeadRequest from "./Head/screens/AddHeadRequest";
import Settings from "./Admin/screens/SettingsScrn";
import ReportScrn from "./Admin/screens/ReportSrcn";
import ReportDetail from "./Admin/screens/ReportDetail";
import ReportProScrn from "./Admin/screens/ReportProScrn";
import HeadReportscrn from "./Head/screens/HeadReportscrn";
import HeadReportDetail from "./Head/screens/HeadReportDetail";
import ReportProDetailscrn from "./Admin/screens/ReportProDetailscrn";

function App() {

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/addUser" component={AddUser}/>
          <PrivateRouter path="/adminCreateUser" component={CreateUser}/>
          <PrivateRouter path="/addUserReq" component={AddReqUser}/>
          <PrivateRouter path="/userReqs" component={UserReqScreen} />
          <PrivateRouter path="/reqDetails" component={UserReqDetail} />
          <PrivateRouter path="/headReqDetail" component={HeadReqDetailScreen}/>
          <PrivateRouter path="/headUser" component={HeadUser}/>
          <PrivateRouter path="/headUserEdit" component={EditHeadUser}/>
          <PrivateRouter path="/headReqs" component={RequestHeadSrcn}/>
          <PrivateRouter path="/requestEdit" component={RequestDetails}/>
          <PrivateRouter path="/headAddReq" component={AddHeadRequest}/>
          <PrivateRouter path="/adminReqs" component = {ReqAdminScreen}/>
          <PrivateRouter path="/adminReqsPro" component = {ProReqAdminScrn}/>
          <PrivateRouter path="/requests" component={RequestScreen} />
          <PrivateRouter path="/reqAdminEdit" component={ReqAdminEditScreen} />
          <PrivateRouter path="/reqAdminEditPro" component={ProAdminEditScrn} />
          <PrivateRouter path="/editUser" component={UserEditt}/>
          <PrivateRouter path="/requestProgrammer" component={ProRequest}/>
          <PrivateRouter path="/editRequest" component={ProRequestEdit}/>
          <PrivateRouter path="/settings" component={Settings}/>
          <PrivateRouter path="/report" component={ReportScrn}/>
          <PrivateRouter path="/reports" component={ReportProScrn}/>
          <PrivateRouter path="/reportDetail" component={ReportDetail}/>
          <PrivateRouter path="/detail" component={ReportProDetailscrn}/>
          <PrivateRouter path="/headReport" component={HeadReportscrn}/>
          <PrivateRouter path="/headReportDetail" component={HeadReportDetail}/>
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
