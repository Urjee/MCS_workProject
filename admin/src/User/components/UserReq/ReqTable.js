import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const RequestTable = (props) => {
  const { requests }=props;
  const dispatch = useDispatch();
  
  console.log(requests)

  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));
  
  const isAdmin = userinfo.isAdmin;
  
  const userid = window.localStorage.getItem("userid");
  const headid = window.localStorage.getItem("headid");


  let arr = [];

  for(let i in requests) {
    if (requests[i].UserID == userid) {
      arr.push({
        userReqID: requests[i].userReqID,
        name: requests[i].name,
        organizationName: requests[i].organizationName,
        subWorkID: requests[i].subWorkID,
        importanceName: requests[i].importanceName,
        stateName: requests[i].stateName,
        planTime: requests[i].planTime,
        file_name: requests[i].file_name,
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
              <td>{request.organizationName}</td>
              <td>{request.subWorkID}</td>
              <td>{request.importanceName}</td>
              <td>{request.stateName}</td>
              <td>{request.planTime}</td>
              <td>{request.file_name}</td>
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



