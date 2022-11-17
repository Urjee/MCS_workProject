import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Users from "./Users";

const UserMain = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const UserID = window.localStorage.userid * 1;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete } = userDelete;

  const [searchTerm, setSearch] = useState("");
  const keys = ["firstname", "lastname", "email"];

  const search = (users) => {
    return users.filter((user) =>
      keys.some((key) => user[key].toLowerCase().includes(searchTerm))
    );
  };
  useEffect(() => {
    dispatch(listUser(UserID));
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Хэрэглэгчид</h2>
        <div>
          <Link to="/adminCreateUser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Хэрэглэгч нэмэх
          </Link>
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Хайх..."
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              {errorDelete && (
                <Message variant="alert-danger">{errorDelete}</Message>
              )}
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <Users users={search(users)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserMain;
