import React from "react";
import HeaderHead from "../HeaderHead";
import SidebarHead from "../SidebarHead";
import DetailReport from "../components/HeadReport/DetailReport";

const HeadReportDetail = () => {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <DetailReport />
      </main>
    </>
  );
};

export default HeadReportDetail;
