import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

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
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 7;
  const pageVisited = pageNumber * usersPerPage;
  const displayUsers = users
    .slice(pageVisited, pageVisited + usersPerPage)
    .map((user) => {
      return (
      <tbody>
          <tr key={user.UserID} onClick={() => handleClick(user.UserID)}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.job}</td>
            <td>{user.departmentName}</td>
            <td>{user.activeName}</td>
          </tr>
      </tbody>
      );
    });
    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };     
  return (
    <div>
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
      {displayUsers}
      </table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      </div>
  );
};

export default HeadUsers;
