import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import products from "./../../data/Products";

const MainProducts = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="row">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
