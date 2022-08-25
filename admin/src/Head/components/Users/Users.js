import React from "react";
import { Link } from "react-router-dom";

const Users = (props) => {
  const { users } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Хэрэглэгчийн нэр</th>
          <th scope="col">Овог</th>
          <th scope="col">Имэйл</th>
          <th scope="col">Утас</th>
          <th scope="col">Хаяг</th>
          <th scope="col">Албан тушаал</th>
          <th scope="col">Харьяа байгууллага</th>
          <th scope="col" className="text-end">
            Үйлдэл
          </th>
        </tr>
      </thead>
      <tbody>
        {/* {users.map((user) => (
          <tr key={user.UserID}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>{user.job}</td>
            <td>{user.organizationID}</td>
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

        */}
      </tbody>
    </table>
  );
};

export default Users;
