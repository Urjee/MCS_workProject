import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReqAdminMain from "../components/AdminReq/ReqAdminMain";

const ReqAdminScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReqAdminMain />
      </main>
    </>
  );
};

export default ReqAdminScreen;
