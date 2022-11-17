import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const HeadUsers = (props) => {
  const { users } = props;
  const history = useHistory();

  const handleClick = (UserID) => {
    setTimeout(() => history.push(`/headUserEdit/?id=${UserID}`));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch);
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Хэрэглэгчийн нэр</th>
          <th scope="col">Овог</th>
          <th scope="col">Имэйл</th>
          <th scope="col">Утас</th>
          <th scope="col">Албан тушаал</th>
          <th scope="col">Алба хэлтэс</th>
          <th scope="col">Хэрэглэгчийн төлөв</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.UserID} onClick={() => handleClick(user.UserID)}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.job}</td>
            <td>{user.departmentName}</td>
            <td>{user.activeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HeadUsers;
