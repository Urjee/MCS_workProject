import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddUserMain from "../components/Users/AddUserMain";

const UserAddMain = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddUserMain />
      </main>
    </>
  );
};

export default UserAddMain;
