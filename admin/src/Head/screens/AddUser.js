import React from "react";
import HeaderHead from "../HeaderHead";
import SidebarHead from "../SidebarHead";
import AddUsers from "../components/HeadUser/AddUsers";
const RequestHeadSrcn = ()=> {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <AddUsers/>
      </main>
    </>
  )};

export default RequestHeadSrcn;
