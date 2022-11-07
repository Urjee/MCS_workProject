import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import AddUserMain from "../components/Users/AddUserMain";
const CreateUser = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddUserMain/>
      </main>
    </>
  );
};

export default CreateUser;
