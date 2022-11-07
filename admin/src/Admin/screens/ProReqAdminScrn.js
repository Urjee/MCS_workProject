import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReqAdminMainPro from "../components/AdminReqPro/ReqAdminMainPro";

const ProReqAdminScrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReqAdminMainPro />
      </main>
    </>
  );
};

export default ProReqAdminScrn;
