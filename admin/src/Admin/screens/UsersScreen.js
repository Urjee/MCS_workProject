import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import UserMain from "../components/Users/UserMain";
import AddUserMain from "../components/Users/AddUserMain";
const UsersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserMain />
        {/* <AddUserMain/> */}
      </main>
    </>
  );
};

export default UsersScreen;
