import React from "react";
import { Link } from "react-router-dom";

const RequestTable = (props) => {
  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));
  
  const isAdmin = userinfo.isAdmin;
  const { requests }=props;
  
  const userid = window.localStorage.getItem("userid");
  const headid = window.localStorage.getItem("headid");


  let arr = [];

  for(let i in requests) {
    if (requests[i].UserID == userid) {
      arr.push({
        userReqID: requests[i].userReqID,
        name: requests[i].name,
        organizationID: requests[i].organizationID,
        subWorkID: requests[i].subWorkID,
        importanceID: requests[i].importanceID,
        stateID: requests[i].stateID,
        planTime: requests[i].planTime,
        file_id: requests[i].file_id,
        description: requests[i].description
      })
    }
  }

  console.log(arr)
  

  return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Нэр</th>
            <th scope="col">Харилцагч байгууллага</th>
            <th scope="col">Дэд Ажил</th>
            <th scope="col">Чухал байдал</th>
            <th scope="col">Төлөв</th>
            <th scope="col">Төлөвлөгөөт огноо</th>
            <th scope="col">Хавсралт</th>
            <th scope="col">Дэлгэрэнгүй</th>
            <th scope="col" className="text-end">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((request)=>(
            <tr key={request.userReqID}>
              <td>{request.name}</td>
              <td>{request.organizationID}</td>
              <td>{request.subWorkID}</td>
              <td>{request.importanceID}</td>
              <td>{request.stateID}</td>
              <td>{request.planTime}</td>
              <td>{request.file_id}</td>
              <td>{request.description}</td>
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
                  <Link className="dropdown-item" to="#">
                    Засах
                  </Link>
                  <Link className="dropdown-item text-danger" to="#">
                    Устгах
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



