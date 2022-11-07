import React from "react";
import { Link } from "react-router-dom";

const ReqAdmin = (props) => {
  const { requests } = props;
  console.log(requests);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          <th scope="col">Дэд ажил</th>
          <th scope="col">Байгууллага</th>
          <th scope="col">Чухал байдал</th>
          <th scope="col">Төлөв</th>
          <th scope="col">Үүсгэсэн огноо</th>
          <th scope ="col">Төлөвлөгөөт хугацаа</th>
          <th scope="col">Бодит цаг</th>
          <th scope="col">Эхэлсэн огноо</th>
          <th scope="col">Дуусах огноо</th>
          <th scope="col">Гүйцэтгэгч</th>
          <th scope="col">Хавсралт</th>
          <th scope="col">Тайлбар</th>
          <th scope="col">Ажлын гүйцэтгэл</th>
          <th scope="col" className="text-end">
            Үйлдэл
          </th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.userReqID}>
            <td>{request.name}</td>
            <td><Link to="#">0</Link></td>
            <td>{request.organizationName}</td>
            <td>{request.importanceName}</td>
            <td>{request.stateName}</td>
            <td>{new Date(request.createDate).toISOString().slice(0, 10).replace('T', ' ')}</td>
            <td>{new Date(request.planTime).toISOString().slice(0, 19).replace('T', ' ')}</td>
            <td>{request.realTime}</td>
            <td>{new Date(request.startDate).toISOString().slice(0, 11).replace('T', ' ')}</td>
            <td>{new Date(request.endDate).toISOString().slice(0, 11).replace('T', ' ')}</td>
            <td>{request.firstname}</td>
            <td>{request.file_name}</td>
            <td>{request.description}</td>
            <td>{request.percentOfPerform}%</td>
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
                    to={{pathname: `/reqAdminEdit/?id=${request.userReqID}`}}>
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

export default ReqAdmin;
