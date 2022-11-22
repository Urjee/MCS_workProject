import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReport } from "../../Redux/Actions/requestActions";
import ReportTable from "./ReportTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { CSVLink } from "react-csv";
// import { DateRangePicker } from 'rsuite';

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import "rsuite/dist/rsuite.css";

const ReportMain = () => {
  const dispatch = useDispatch();
  // const [dataValue, setDateValue] = useState([]);

  const reportList = useSelector((state) => state.reportList);
  const { loading, error, requests } = reportList;
  const [searchTerm, setSearch] = useState("");


  // var startDate = new Date("2015-08-04");
  //       var endDate = new Date("2015-08-12");

  //       var resultProductData = requests.filter(function (a) {
  //           var hitDates = a.ProductHits || {};
  //           hitDates = Object.keys(hitDates);
  //           hitDates = hitDates.map(function(date) { return new Date(date); });
  //           var hitDateMatches = hitDates.filter(function(date) { return date >= startDate && date <= endDate });
  //           return hitDateMatches.length>0;
  //       });
  //       console.log(resultProductData);

  const keys = [
    "name",
    "firstname",
    "stateName",
    "organizationName",
    "realTime",
    "startDate",
    "endDate",
    "file_name",
  ];
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
    dispatch(allReport());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Цаг зарцуулалтын тайлан</h2>
        <div>
          <CSVLink
            data={arr}
            filename="Report"
            className="btn btn-success ms-2"
          >
            <i className="fas fa-print">
              <button className="btn btn-success ms-2">Тайлан татах </button>
            </i>
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
          <div className="col-lg-4 col-md-6 me-auto">
          {/* <DateRangePicker 
          className="form-control"
          onChange={setDateValue}
          /> */}
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
              <ReportTable requests={search(requests)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportMain;
