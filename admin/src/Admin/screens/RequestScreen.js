import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainRequests from "../components/Request/MainRequests";
import ReqAdminMain from "../components/AdminReq/ReqAdminMain";

const RequestScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainRequests />
      </main>
    </>
  );
};

export default RequestScreen;
