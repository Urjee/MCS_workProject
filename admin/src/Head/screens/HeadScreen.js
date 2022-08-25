import React from "react";
import HeaderHead from "../HeaderHead";
import MainHead from "../MainHead";
import SidebarHead from "../SidebarHead";

const HeadScreen = () => {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <MainHead />
      </main>
    </>
  );
};

export default HeadScreen;
