import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportAll } from "../../Redux/Actions/requestActions";
import ReportProTable from "./ReportProTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { CSVLink } from "react-csv";

const ReportProMain = () => {
  const dispatch = useDispatch();

  const reportList = useSelector((state) => state.reportList);
  const { loading, error, requests } = reportList;
  const [searchTerm, setSearch] = useState("");
  const keys = ["name", "importanceName", "stateName", "organizationName"];

  const search = (requests) => {
    return requests.filter((request) =>
      keys.some((key) => request[key].toLowerCase().includes(searchTerm))
    );
  };
  const arr = [];

  for (var i in requests) {
    arr.push({
      "Ажил даалгаврын нэр": requests[i].name,
      "Хэрэглэгч": requests[i].firstname,
      "Ажлын төрөл": requests[i].importanceName,
      "Байгууллага": requests[i].organizationName,
      "Төлөвлөгөөт хугацаа": requests[i].planTime,
      "Үүсгэсэн огноо": requests[i].createDate,
      "Эхэлсэн огноо": requests[i].startDate,
      "Дууссан хугацаа": requests[i].endDate,
      "Бодит цаг": requests[i].realTime,
      "Төлөв": requests[i].stateName,
      "Гүйцэтгэгч": requests[i].userrname,
    });
  }

  useEffect(() => {
    dispatch(reportAll());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Цаг зарцуулалтын тайлан</h2>
        <div>
          <CSVLink data={arr} filename="Report">
            <button className="btn btn-second">Тайлан татах </button>
          </CSVLink>
        </div>
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
              <ReportProTable requests={search(requests)} />
              </div>
                )}
                </>
            )}
        </div>
      </div>
    </section>
  );
};

export default ReportProMain;
