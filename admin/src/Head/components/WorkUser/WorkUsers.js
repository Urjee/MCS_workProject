import React, { useState } from "react";
import { Link } from "react-router-dom";

const WorkUsers = (props) => {
  const { workUsers }=props;

  // let data = [];
  
  // fetch("http://localhost:8080/api/workUsers")
  // .then(response => response.json())
  // .then(item => data.push(item));

  // console.log(data)
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          <th scope="col">Харилцагч</th>
          <th scope="col">Дэд ажил</th>
          <th scope="col">Чухал байдал</th>
          <th scope="col">Төлөвлөгөөт цаг</th>
          <th scope="col">Хавсралт</th>
          <th scope="col">Дэлгэрэнгүй</th>
          <th scope="col" className="text-end">
            Үйлдэл
          </th>
        </tr>
      </thead>
      {/* <tbody>
         {workUsers.map((workUser) => (
          <tr key={workUser.workUser_id}>
            <td>{workUser.name}</td>
            <td>{workUser.organizationID}</td>
            <td>{workUser.subWorkID}</td>
            <td>{workUser.importance_id}</td>
            <td>{workUser.planTime}</td>
            <td><a src={workUser.filePath}>{workUser.file}</a></td>
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
               n </div>
              </div>
              </td>
        </tr>
        ))}  

      </tbody> */}
    </table>
  );
};

export default WorkUsers;
