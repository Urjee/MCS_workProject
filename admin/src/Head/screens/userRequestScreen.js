import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import UserReqMain from "../components/userRequest/userReqMain";

const OrderScreen = () => {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <UserReqMain />
      </main>
    </>
  );
};

export default OrderScreen;
