import React from "react";
import HeaderHead from "../HeaderHead";
import SidebarHead from "../SidebarHead";
import HeadUserEdit from "../components/HeadUser/HeadUserEdit";

const EditHeadUser = (props) => {
  const {users} = props;
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <HeadUserEdit users={users} />
      </main>
    </>
  )};

export default EditHeadUser;
