import React from "react";
import { Link } from "react-router-dom";

const Request = (props) => {
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
                    to={{pathname: `/editRequest/?id=${request.userReqID}`}}>
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

export default Request;



