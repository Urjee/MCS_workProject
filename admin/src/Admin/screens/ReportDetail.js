import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReportDetail from "../components/Report/ReportDetail";

const ReportScrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReportDetail />
      </main>
    </>
  );
};

export default ReportScrn;
