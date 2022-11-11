import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReportProDetail from "../components/ReportsPro/ReportProDetail";

const ReportProDetailscrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReportProDetail />
      </main>
    </>
  );
};

export default ReportProDetailscrn;
