import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import ReqMainHead from "../components/HeadRequest/ReqMainHead";
const RequestHeadSrcn = (props) => {
  const {headReqs} = props;
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <ReqMainHead headReqs={headReqs} />
      </main>
    </>
  );
};

export default RequestHeadSrcn;
