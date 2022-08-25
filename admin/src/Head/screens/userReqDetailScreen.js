import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import UserReqDetailmain from "../components/userRequest/userReqDetailmain"

const userReqDetailScreen = ({match}) => {
  const userReqID=match.params.userReqID;

  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        {/* <UserReqDetailmain/> */}
        <UserReqDetailmain  userReqID={userReqID}/>
      </main>
    </>
  );
};

export default userReqDetailScreen;
