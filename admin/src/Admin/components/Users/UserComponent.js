import React, { useEffect } from "react";
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

  useEffect(() => {
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

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Өмнөх
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Дараагийн
                </Link>
              </li>
            </ul>
          </nav>
    </section>
  );
};

export default UserComponent;
