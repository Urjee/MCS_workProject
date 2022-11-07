import React from "react";
import SidebarUser from "../SidebarUser";
import HeaderUser from "../HeaderUser";
import CreateUserReq from "../components/UserReq/CreateUserReq";

const AddReqUser = () => {
  return (
    <>
      <SidebarUser />
      <main className="main-wrap">
        <HeaderUser />
        <CreateUserReq />
      </main>
    </>
  );
};

export default AddReqUser;
