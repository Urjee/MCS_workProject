import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const RequestTable = (props) => {
  const { userReqs }=props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch)
  })
      return (
      <table className="table" >
          <thead>
              <th scope="col">Нэр</th>
              <th scope="col">Дэд Ажил</th>
              <th scope="col">Ажлын төрөл</th>
              <th scope="col">Төлөв</th>
              <th scope="col">Үүсгэсэн огноо</th>
              <th scope="col">Хавсралт</th>
              <th scope="col">Дэлгэрэнгүй</th>
              <th scope="col" className="text-end"></th>
          </thead>
          <tbody>
            {userReqs.map((request)=>(
              <tr key={request.userReqID}>
                <td>{request.name}</td>
                <Link><td>{request.subWorkID}0</td></Link>
                <td>{request.importanceName}</td>
                <td>{request?.stateName}</td>
                <td>{new Date(request?.createDate).toISOString().slice(0, 10).replace('T', ' ')}</td>
                <td>{request?.file_name}</td>
                <td>{request.description}</td>
                <td className="text-end">
                <div className="dropdown">
                    <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                    <Link className="dropdown-item" to={{ pathname: `/reqDetails/?id=${request.userReqID}` }}> 
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



