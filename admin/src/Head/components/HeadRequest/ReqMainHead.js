import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../Redux/Actions/requestActions";
import RequestHead from "./RequestHead";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ReqMainHead = () => {
  const dispatch = useDispatch();
  const headRequestList = useSelector((state) => state.headRequestList);
  const { loading, error, headReqs } = headRequestList;
  const UserID = window.localStorage.organizationID * 1;
  const [searchTerm, setSearch] = useState("");
  const keys = ["name", "stateName", "importanceName"];

  const search = (userReqs) => {
    return userReqs.filter((userReq) =>
      keys.some((key) => userReq[key].toLowerCase().includes(searchTerm))
    );
  };
  useEffect(() => {
    dispatch(listRequest(UserID));
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ажил даалгаврууд</h2>
        <div>
          <Link to="/headAddReq" className="btn btn-primary">
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
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <RequestHead headReqs={search(headReqs)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReqMainHead;
