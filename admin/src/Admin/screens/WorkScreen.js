import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WorkMain from "../components/Work/WorkMain";
const WorkScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <WorkMain />
      </main>
    </>
  );
};

export default WorkScreen;
