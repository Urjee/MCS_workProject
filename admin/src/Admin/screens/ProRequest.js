import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RequestMain from "../components/RequestPro/RequestMain";

const ProRequest = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <RequestMain />
      </main>
    </>
  );
};

export default ProRequest;
