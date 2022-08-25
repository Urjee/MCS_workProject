import React from "react";
import SidebarUser from "../SidebarUser";
import HeaderUser from "../HeaderUser";
import MainRequests from "../components/UserReq/MainRequests";

const RequestScreen = () => {
  return (
    <>
      <SidebarUser />
      <main className="main-wrap">
        <HeaderUser />
        <MainRequests />
      </main>
    </>
  );
};

export default RequestScreen;
