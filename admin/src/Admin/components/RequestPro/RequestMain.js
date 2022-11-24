import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestProList } from "../../Redux/Actions/requestActions";
import Request from "./Request";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const RequestMain = () => {
  const dispatch = useDispatch();

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;

  useEffect(() => {
    dispatch(requestProList());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ирсэн хүсэлтүүд</h2>
      </div>
      <div className="card mb-4">
        <div className="card-body">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
              {
                requests.length === 0 ? (
                  <div className="col-12 alert alert-info text-center mt-3">
                    Одоогоор дата байхгүй
                  </div>
                ) : (
                  <div className="table-responsive">
              <Request requests={(requests)} />
              </div>
                )}
                </>
            )}
        </div>
      </div>
    </section>
  );
};

export default RequestMain;
