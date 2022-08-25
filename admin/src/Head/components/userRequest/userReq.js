import React from "react";
import { Link } from "react-router-dom";

const UserReq = (props) => {
  const { requests }=props;
  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

    const isAdmin = userinfo.isAdmin;
  return (
    
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Нэр</th>
            <th scope="col">Харилцагч байгууллага</th>
            <th scope="col">Дэд Ажил</th>
            <th scope="col">Чухал байдал</th>
            <th scope="col">Төлөвлөгөөт огноо</th>
            <th scope="col">Хавсралт</th>
            <th scope="col">Дэлгэрэнгүй</th>
            <th scope="col" className="text-end">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request)=>(
            <tr key={request.userReqID}>
              <td>{request.name}</td>
              <td>{request.organizationID}</td>
              <td>{"0"}</td>
              <td>{request.importanceID}</td>
              <td>{request.planTime}</td>
              <td>{request.file_id}</td>
              <td>{request.description}</td>
              
              <td className="d-flex justify-content-end align-item-center">
              {/* <Link to={`/userReqs/${request.userReqID}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link> */}
                { isAdmin !== 3 ? null :
              <Link to={`/userReq`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
                }
            </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default UserReq;



