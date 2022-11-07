import React from "react";
import HeaderHead from "../HeaderHead";
import SidebarHead from "../SidebarHead";
import HeadUserMain from "../components/HeadUser/HeadUserMain";

const HeadUser = (props) => {
  const {users} = props;
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <HeadUserMain users={users} />
      </main>
    </>
  );
  }
export default HeadUser;
