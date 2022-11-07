import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReqAdminEdit from "../components/AdminReq/ReqAdminEdit";

const ReqAdminEditScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReqAdminEdit />
      </main>
    </>
  );
};

export default ReqAdminEditScreen;
