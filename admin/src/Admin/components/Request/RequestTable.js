import React from "react";
import { Link } from "react-router-dom";

const RequestTable = (props) => {
  const { requests }=props;
  return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Нэр</th>
            <th scope="col">Ажлын төрөл</th>
            <th scope="col">Төлөв</th>
            <th scope="col">Хавсралт</th>
            <th scope="col">Дэлгэрэнгүй</th>
            <th scope="col"> Байгууллага</th>
            <th>Үүсгэсэн огноо</th>
            <th scope="col" className="text-end">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request)=>(
            <tr key={request.userReqID}>
              <td>{request.name}</td>
              <td>{request.importanceName}</td>
              <td>{request.stateName}</td>
              <td>{request?.file_name}</td>
              <td>{request.description}</td>
              <td>{request.organizationName}</td>
              <td>{new Date(request.createDate).toISOString().slice(0,10).replace('T', '')}</td>
              <td className="text-end">
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" 
                    to={{pathname: `/requestEdit/?id=${request.userReqID}`}}>
                    Засах
                  </Link>
                </div>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default RequestTable;




//shine irsen huseltuud
// const LatestOrder = (props) => {
//   const { loading, error, orders } = props;
//   return (
//     <div className="card-body">
//       <h4 className="card-title">New orders</h4>
//       {loading ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="alert-danger">{error}</Message>
//       ) : (
//         <div className="table-responsive">
//           <table className="table">
//             <tbody>
//               {orders.slice(0, 5).map((order) => (
//                 <tr key={order._id}>
//                   <td>
//                     <b>{order.user.name}</b>
//                   </td>
//                   <td>{order.user.email}</td>
//                   <td>${order.totalPrice}</td>
//                   <td>
//                     {order.isPaid ? (
//                       <span className="badge rounded-pill alert-success">
//                         Paid At {moment(order.paidAt).format("MMM Do YY")}
//                       </span>
//                     ) : (
//                       <span className="badge rounded-pill alert-danger">
//                         Not Paid
//                       </span>
//                     )}
//                   </td>
//                   <td>{moment(order.createdAt).calendar()}</td>
//                   <td className="d-flex justify-content-end align-item-center">
//                     <Link to={`/order/${order._id}`} className="text-success">
//                       <i className="fas fa-eye"></i>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };


