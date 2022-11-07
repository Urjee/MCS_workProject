import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UserEdit from "../components/Users/UserEdit";

const UserEditt = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserEdit />
      </main>
    </>
  );
};

export default UserEditt;
