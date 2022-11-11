import React,  {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate"

const Users = (props) => {
  const { users } = props;
  const history = useHistory();
  const handleClick = (UserID) => {
    setTimeout(() => history.push(`/editUser/?id=${UserID}`))
}
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 7
  const pageVisited = pageNumber * usersPerPage;
  const displayUsers = users
    .slice(pageVisited, pageVisited + usersPerPage)
    .map(user => {
      return (
        <tbody className="">
          <tr key={user.UserID} onClick={() => handleClick(user.UserID)} >
            <td>{user.UserID}</td>
            <td key={user.UserID} className="listItem">{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.organizationName}</td>
            <td>{user.departmentName}</td>
            <td>{user.job}</td>
            <td>{user.jobTitleName}</td>
            <td>{user.headName}</td>
            <td>{user.activeName}</td>      
          </tr> 
      </tbody>
      )
    }
    )   
    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({selected}) => {
      setPageNumber(selected);
    };
    return (
      <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Нэр</th>
            <th scope="col">Овог</th>
            <th scope="col">Имэйл</th>
            <th scope="col">Утас</th>
            <th scope="col">Харьяа байгууллага</th>
            <th scope="col">Алба хэлтэс</th>
            <th scope="col">Албан тушаал</th>
            <th scope="col">Албан тушаалын төрөл</th>
            <th scope="col">Удирдлага</th>
            <th scope="col">Төлөв</th>
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

export default Users;
