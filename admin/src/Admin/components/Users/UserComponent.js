import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Users from "./Users";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  
  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;

  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

  const isAdmin = userinfo.isAdmin;

  // const [ currentItems, setCurrentItems]=useState(null);
  // const [ pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffSet] = useState(0);

  useEffect(() => {
    // const endOffset = itemOffset+ itemPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(items.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(items.length / itemPerPage));

    // const handlePageClick = (event) => {
    //   const newOffset = event.selected * itemsPerPage % items.length;
    //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    //   setItemOffset(newOffset);
    // };
  
    dispatch(listUser());
  }, [dispatch, successDelete]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Хэрэглэгчид</h2>
        <div>
          { isAdmin !== 3 && 
            <Link to="/addUser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Хэрэглэгч нэмэх
          </Link>}          
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>            
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {/* <div className="table-responsive"> */}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Users users={users} />
            )}
        </div>
      </div>
            <div id="container">
            {/* <Items currentItems={currentItems} />
            <ReactPaginate
              nextLabel="next >"
              onClick={handlePageClick}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            /> */}
            </div>
          {/* <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="1">
                  Өмнөх
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="2">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="3">
                  Дараагийн
                </Link>
              </li>
            </ul>
          </nav> */}
    </section>
  );
};

export default UserComponent;
