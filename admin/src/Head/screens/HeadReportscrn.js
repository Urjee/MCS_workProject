import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import MainReport from "../components/HeadReport/MainReport";

const HeadReportscrn = (props) => {
  const {requests} =props;
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <MainReport requests={requests} />
      </main>
    </>
  );
};

export default HeadReportscrn;
