import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./Admin/screens/NotFound";
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from "./Admin/screens/HomeScreen";
import Login from "./Admin/screens/LoginScreen";
import UsersScreen from "./Admin/screens/UsersScreen";
import RequestScreen from "./Admin/screens/RequestScreen";
import UserReqScreen from "./User/screens/UserReqScreen";
import AddReqUser from "./User/screens/AddReqUser";
import UserReqDetail from "./User/screens/UserReqDetail";
import RequestHeadSrcn from "./Head/screens/RequestHeadScrn";
import ReqAdminScreen from "./Admin/screens/ReqAdminScreen";
import HeadReqDetailScreen from "./Head/screens/HeadReqDetailScreen";
import HeadUser from "./Head/screens/HeadUser";
import AddUser from "./Head/screens/AddUser";
import CreateUser from "./Admin/screens/CreateUser";
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
import { Provider } from "react-redux";
import { store, persistor } from "./Admin/Redux/store";
function App() {

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <>
      <Router>
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/users" component={UsersScreen} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/adminCreateUser" component={CreateUser} />
          <Route path="/addUserReq" component={AddReqUser} />
          <Route path="/userReqs" component={UserReqScreen} />
          <Route path="/reqDetails" component={UserReqDetail} />
          <Route
            path="/headReqDetail"
            component={HeadReqDetailScreen}
          />
          <Route path="/headUser" component={HeadUser} />
          <Route path="/headUserEdit" component={EditHeadUser} />
          <Route path="/headReqs" component={RequestHeadSrcn} />
          <Route path="/requestEdit" component={RequestDetails} />
          <Route path="/headAddReq" component={AddHeadRequest} />
          <Route path="/adminReqs" component={ReqAdminScreen} />
          <Route path="/adminReqsPro" component={ProReqAdminScrn} />
          <Route path="/requests" component={RequestScreen} />
          <Route path="/reqAdminEdit" component={ReqAdminEditScreen} />
          <Route path="/reqAdminEditPro" component={ProAdminEditScrn} />
          <Route path="/editUser" component={UserEditt} />
          <Route path="/requestProgrammer" component={ProRequest} />
          <Route path="/editRequest" component={ProRequestEdit} />
          <Route path="/settings" component={Settings} />
          <Route path="/report" component={ReportScrn} />
          <Route path="/reports" component={ReportProScrn} />
          <Route path="/reportDetail" component={ReportDetail} />
          <Route path="/detail" component={ReportProDetailscrn} />
          <Route path="/headReport" component={HeadReportscrn} />
          <Route
            path="/headReportDetail"
            component={HeadReportDetail}
          />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
    </PersistGate>
    </Provider>  );
}

export default App;
