import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headReport } from "../../Redux/Actions/requestActions";
import TableReport from "./TableReport";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { CSVLink } from "react-csv";

const MainReport = () => {
  const dispatch = useDispatch();

  const headReportList = useSelector((state) => state.headReportList);
  const { loading, error, requests } = headReportList;
  const arr = [];
  const organizationID = window.localStorage.organizationID * 1;

  for (var i in requests) {
    arr.push({
      "Ажил даалгаврын нэр": requests[i].name,
      "Хэрэглэгч": requests[i].firstname,
      "Ажлын төрөл": requests[i].importanceName,
      "Байгууллага": requests[i].organizationName,
      "Төлөвлөгөөт хугацаа":requests[i].planTime,
      "Үүсгэсэн огноо": requests[i].createDate,
      "Эхэлсэн огноо": requests[i].startDate,
      "Дууссан хугацаа": requests[i].endDate,
      "Бодит цаг": requests[i].realTime,
      "Төлөв": requests[i].stateName,
      "Гүйцэтгэгч": requests[i].userrname,
    });
  }
  useEffect(() => {
    dispatch(headReport(organizationID));
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
          <div className="col-lg-4 col-md-6 me-auto"></div>
        </div>
      </header>
     
      <div className="card shadow-sm">
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
              <TableReport requests={requests} />
              </div>
            )} 
            </>
            )}
        </div>
      </div>
    </section>
  );
};

export default MainReport;
