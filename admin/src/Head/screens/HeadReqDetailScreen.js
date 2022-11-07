import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import DetailsHeadReq from "../components/HeadRequest/DetailsHeadReq";

const HeadReqDetailScreen = ({match}) => {
  const userReqID=match.params.userReqID;

  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <DetailsHeadReq userReqID={userReqID}/>
      </main>
    </>
  );
};

export default HeadReqDetailScreen;
