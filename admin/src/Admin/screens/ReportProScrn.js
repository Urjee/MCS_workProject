import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReportProMain from "../components/ReportsPro/ReportProMain";

const ReportProScrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReportProMain />
      </main>
    </>
  );
};

export default ReportProScrn;
