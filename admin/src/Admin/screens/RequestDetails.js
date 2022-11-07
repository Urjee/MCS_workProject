import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RequestEdit from "../components/Request/RequestEdit";

const RequestDetails = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <RequestEdit />
      </main>
    </>
  );
};

export default RequestDetails;
