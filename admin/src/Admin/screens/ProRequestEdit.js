import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditRequest from "../components/RequestPro/EditRequest"
const ProRequestEdit = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditRequest />
      </main>
    </>
  );
};

export default ProRequestEdit;
