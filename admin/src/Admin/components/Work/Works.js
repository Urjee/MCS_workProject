import React from "react";
import { Link } from "react-router-dom";

const Works = (props) => {
  const { works } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          <th scope="col">Харилцагч</th>
          <th scope="col">Үүсгэсэн</th>
          <th scope="col">Хийж эхлэх огноо</th>
          <th scope="col">Гүйцэтгэсэн хугацаа</th>
          <th>Чухал байдал</th>
          <th scope="col">Төлөв</th>
          <th scope="col">Төлөвлөгөөт цаг</th>
          <th scope="col">Бодит цаг</th>
          <th scope="col">Гүйцэтгэгч</th>
          <th scope="col" className="text-end">
            Үйлдэл
          </th>
        </tr>
      </thead>
      <tbody>
        
        {works.map((work) => (
          <tr key={work.work_id}>
            <td>{work.name}</td>
            <td>{work.organizationID}</td>
            <td>{work.create_user}</td>
            <td>{work.date}</td>
            <td>{work.performedTime}</td>
            <td>{work.importance_id}</td>
            <td>{work.stateID}</td>
            <td>{work.planTime}</td>
            <td>{work.realTime}</td>
            <td>{work.execution_worker}</td>
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

export default Works;
