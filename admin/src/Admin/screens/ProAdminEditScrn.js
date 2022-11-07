import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReqAdminEditPro from "../components/AdminReqPro/ReqAdminEditPro";

const ProAdminEditScrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReqAdminEditPro />
      </main>
    </>
  );
};

export default ProAdminEditScrn;
