import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../Redux/Actions/requestActions";
import ReqTable from "./ReqTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainRequests = () => {
  const dispatch = useDispatch();
  const userReqList = useSelector((state) => state.userReqList);
  const { loading, error, userReqs } = userReqList;
  const UserID = window.localStorage.userid * 1;
  const [searchTerm, setSearch] = useState("");
  const keys = ["name", "importanceName","stateName","createDate"];

  const search = (userReqs) => {
    return userReqs.filter((request) =>
      keys.some((key) => request[key].toLowerCase().includes(searchTerm))
    );
  };
  useEffect(() => {
    dispatch(listRequest(UserID));
  }, [dispatch]);

  return (
    <div>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Ажил даалгаврууд</h2>
          <div>
            <Link to="/addUserReq" className="btn btn-primary">
              <i className="material-icons md-plus"></i> Ажил даалгавар нэмэх
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
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <ReqTable userReqs={search(userReqs)} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainRequests;