
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { headReport } from "../../Redux/Actions/requestActions";
import TableReport from "./TableReport";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { CSVLink} from 'react-csv';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
// import { DateRangePicker } from 'rsuite';
// import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';

const MainReport = () => {
  const dispatch = useDispatch();

  const headReportList = useSelector((state) => state.headReportList);
  const { loading, error, requests } = headReportList;
  // handleSelect(date){
  //   console.log(date);
  // }
   
const [userdata, setUserdata]= useState([]); 
 useEffect( ()=>{
    const getuserdata= async ()=>{
      const userreq= await fetch("http://172.16.226.57:8080/api/importance");
      const userres= await userreq.json();
      setUserdata(userres);
 }
getuserdata();
 },[]);
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
 const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}
  useEffect(() => {
    dispatch(headReport());
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
           <DateRangePicker
            ranges={[selectionRange]}
            // onChange={handleSelect}
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
            <TableReport requests={requests} />
            )}
            </div>
      </div>
      </div>
    </section>
  );
};

export default MainReport;
