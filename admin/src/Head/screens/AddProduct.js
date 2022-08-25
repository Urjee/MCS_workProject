import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import AddProductMain from "./../components/products/AddProductMain";

const AddProduct = () => {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
