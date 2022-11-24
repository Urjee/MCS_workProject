import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../Redux/Actions/requestActions";
import RequestTable from "./RequestTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
const MainRequests = () => {
  const dispatch = useDispatch();

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;
  const [searchTerm, setSearch] = useState("");
  const keys = ["name", "importanceName", "stateName", "organizationName"];

  const search = (requests) => {
    return requests.filter((request) =>
      keys.some((key) => request[key].toLowerCase().includes(searchTerm))
    );
  };
  useEffect(() => {
    dispatch(listRequest());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ирсэн хүсэлтүүд</h2>
      </div>
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
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) :(
              <>
              {
                requests.length === 0 ? (
                  <div className="col-12 alert alert-info text-center mt-3">
                    Одоогоор дата байхгүй
                  </div>
                ) : (
                  <div className="table-responsive">
                  <RequestTable  requests={search(requests)} />
                  </div>
                )
              }
              </>
            )}
          </div>
        </div>
    </section>
  );
};

export default MainRequests;
