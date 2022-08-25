import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import MainProducts from "./../components/products/MainProducts";

const ProductScreen = () => {
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
