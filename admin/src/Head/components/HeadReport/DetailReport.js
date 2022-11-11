import React ,{ useState, useEffect }from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { CSVLink} from 'react-csv';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const DetailReport = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const searchString = new URLSearchParams(window.location.search);
  const [importanceName, setImportanceName] = useState("");
  const [organizationName, setOrganizationName ] = useState("");
  const [stateName, setStateName] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [planTime, setPlanTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [realTime, setRealTime] = useState("");
  const [userrname, setUserrname] = useState("");

  const userReqID = searchString.get("id")
  const reportList = useSelector((state) => state.reportList);
  const { requests } = reportList;

  // const date0 = new Date(createDate).toISOString().slice(0,10).replace('T', '')
  //  const date = new Date(startDate).toISOString().slice(0,10).replace('T', '')
  //  const date2 = new Date(endDate).toISOString().slice(0,10).replace('T', '')
  //  const date3 = new Date(realTime).toISOString().slice(12,19).replace('T', '')

  const arr = [];
  for(var i in requests) {
    arr.push({
      'Ажил даалгаврын нэр': requests[i].name,
      'Хэрэглэгч': requests[i].firstname,
      'Ажлын төрөл': requests[i].importanceName,
      'Байгууллага': requests[i].organizationName,
      'Төлөвлөгөөт хугацаа': new Date(requests[i].planTime).toISOString().slice(0,23).replace('T',''),
      'Үүсгэсэн огноо': new Date(requests[i].createDate).toISOString().slice(0,23).replace('T',''),
      'Эхэлсэн огноо': new Date(requests[i].startDate).toISOString().slice(0,10).replace('T',''),
      'Дууссан хугацаа': new Date(requests[i].endDate).toISOString().slice(0,10).replace('T',''),
      'Бодит цаг': new Date(requests[i].realTime).getHours(),
      'Төлөв': requests[i].stateName,
      'Гүйцэтгэгч': requests[i].userrname,
    })
  }
  
useEffect(() => {
  const userid = () => {
    fetch('http://172.16.226.57:8080/api/reportDetail', {
      method: "POST",
      body: 
        JSON.stringify({userReqID: userReqID}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      setName(res[0].name)
      setFirstname(res[0].firstname)
      setImportanceName(res[0].importanceName)
      setOrganizationName(res[0].organizationName)
      setStateName(res[0].stateName)
      setPlanTime(res[0].planTime)
      setRealTime(res[0].realTime)
      setStartDate(res[0].startDate)
      setEndDate(res[0].endDate)
      setUserrname(res[0].userrname)
      setCreateDate(res[0].createDate)
    })
    .catch(function (error){
      console.log(error);
    });
  };
  userid()
}, [])
  return (
    <section className="content-main">
         
      <div className="content-header">
        <Link to="/headReport" className="btn btn-dark text-white">
          Буцах
        </Link>
      </div>
      <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                  {moment(requests.createdAt).format("llll")}
                  </b>
                </span> 
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <CSVLink data={arr} filename="Report" className="btn btn-success ms-2">
                <i className="fas fa-print"></i>
               </CSVLink>
             
              </div>
            </div>
          </header>
          <div className="row mb-5 order-info-wrap">
            <div className="col-md- col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-clock"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Хугацаа</h6>
                  <p className="mb-1">
                    ({startDate})-({endDate})
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-map-marker-alt"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Төлөв</h6>
                  <p className="mb-1">
                  {stateName}
                    <br />
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-4 col-lg-2">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                <i className='fas fa-building'></i> 
                </span>
                <div className="text">
                  <h6 className="mb-1">Байгууллага:</h6>
                  {organizationName}
                </div>
              </article>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                <table className="table border table-lg">
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Ажлын нэр</th>
                      <th style={{ width: "20%" }}>Харилцагч</th>
                      <th style={{ width: "20%" }}>Үүсгэсэн огноо</th>
                      <th style={{ width: "20%" }}>Эхлэх хугацаа</th>
                      <th style={{ width: "20%" }}>Дуусах хугацаа</th>
                      <th style={{ width: "20%" }}>Ажлын төрөл</th>
                      <th style={{ width: "20%" }}>Байгууллага</th>
                      <th style={{ width: "20%" }}>Төлөв</th>
                      <th style={{ width: "20%" }}>Бодит цаг</th>
                      <th style={{ width: "20%" }}>Гүйцэтгэгч</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={userReqID}>
                      <td>{name}</td>
                      <td>{firstname}</td>
                      <td>{createDate}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{importanceName}</td>
                      <td>{organizationName}</td>
                      <td>{stateName}</td>
                      <td>{realTime}</td>
                      <td>{userrname}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default DetailReport;