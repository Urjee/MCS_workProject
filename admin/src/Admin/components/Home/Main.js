import React from "react";
// import axios from "axios";
// // import TopTotal from "../Home/TopTotal"
// import LatestOrder from "./LatestOrder";
// import SalesStatistics from "./SalesStatistics";
// import ProductsStatistics from "./ProductsStatistics";
// import { useSelector } from "react-redux";

const Main = () => {
//   const orderList = useSelector((state) => state.listOrders);
//   const { loading, error, orders } = orderList;
 
  // const isAdmin = props.isAdmin;
  // if (isAdmin === 2) {
    // return <Head />;
  // }
  // return <User />;

  // root.render(<Main isLoggedIn={false} />);
   
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Мэдээ мэдээлэл </h2>
        </div>
           
           {/* <div className="row">
              {/* STATICS */}
              {/* <SalesStatistics />
              <ProductsStatistics /> */}
            {/* </div> */}
                {/* LATEST ORDER  */}
          {/* <div className="card mb-4 shadow-sm">
              <LatestOrder orders={orders} loading={loading} error={error} />
            </div>  */}
      </section>
     </>
  );
        };

export default Main;
