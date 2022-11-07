import React from "react";
import SidebarUser from "../SidebarUser";
import HeaderUser from "../HeaderUser";
import ReqDetails from "../components/UserReq/ReqDetails";

const UserReqDetail = () => {
  return (
    <>
      <SidebarUser />
      <main className="main-wrap">
        <HeaderUser />
        <ReqDetails />
      </main>
    </>
  );
};

export default UserReqDetail;
