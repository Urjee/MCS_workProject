import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../Redux/Actions/requestUserActions";
import RequestTable from "./RequestTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainRequests = () => {
const dispatch = useDispatch();

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;
  
  useEffect(() => {
    dispatch(listRequest());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ирсэн хүсэлтүүд</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
        <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
            <RequestTable requests={requests} />
            )}
            </div>
      </div>
      </div>
    </section>
  );
};

export default MainRequests;
