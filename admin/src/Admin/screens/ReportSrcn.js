import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReportMain from "../components/Report/ReportMain";

const ReportScrn = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReportMain />
      </main>
    </>
  );
};

export default ReportScrn;
