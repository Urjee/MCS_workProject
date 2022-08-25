import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listWorkUser } from "../../Redux/Actions/workActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import WorkUser from "./WorkUsers";

const WorkComponent = () => {
  const dispatch = useDispatch();

  const workList = useSelector((state) => state.workList);
  const { loading, error, workUsers } = workList;

  useEffect(() => {
    dispatch(listWorkUser());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ажил даалгавар</h2>
        <div>
          <Link to="/addWorkUser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Хүсэлт нэмэх
          </Link>          
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

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>          
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <WorkUser workUsers={workUsers} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkComponent;
