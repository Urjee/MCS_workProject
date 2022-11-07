import React from "react";
import HeaderHead from "../HeaderHead";
import SidebarHead from "../SidebarHead";
import ReqAdd from "../components/HeadRequest/RequestAdd";

const AddHeadRequest =()=> {
    return (
      <>
        <SidebarHead />
        <main className="main-wrap">
          <HeaderHead />
          <ReqAdd />
        </main>
      </>
    );}
export default AddHeadRequest;
