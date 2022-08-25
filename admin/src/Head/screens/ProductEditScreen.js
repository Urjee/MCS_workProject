import React from "react";
import SidebarHead from "../SidebarHead";
import HeaderHead from "../HeaderHead";
import EditProductMain from "./../components/products/EditproductMain";
import products from "./../data/Products";

const ProductEditScreen = ({ match }) => {
  const productId = products.find((p) => p._id === match.params.id);
  return (
    <>
      <SidebarHead />
      <main className="main-wrap">
        <HeaderHead />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
