import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/Users/UserComponent";
// import AddUserMain from "./AddUserMain";
const UsersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent />
        {/* <AddUserMain/> */}
      </main>
    </>
  );
};

export default UsersScreen;
