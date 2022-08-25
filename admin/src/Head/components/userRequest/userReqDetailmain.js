import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import UserReqDetail from "./UserReqDetail";
import "../../../Admin/components/Request/RequestTable"
const UserReqDetailmain = (props) => {
  const { userReqID }= props;
  const history= useHistory();
  const handleSubmit= ()=> history.push('/RequestTable.js');
  return (
    <section className="content-main">
      <form >
      <div className="content-header">
        <Link to="/userReqs" className="btn btn-dark text-white">
          Буцах
        </Link>
      </div>

      <div className="card">
        <header className="card-header p-3 Header-green">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-6">
              <span>
                <i className="far fa-calendar-alt mx-2"></i>
                <b className="text-white">August 22 2022</b>
              </span>   
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-9">
              <div className="table-responsive">
              {/* {requests.map((request)=>(
                 <UserReqDetail  request={request} key={request.userReqID}/>  
               ))}              */}
              <UserReqDetail/>
              </div>
            </div>
            <br/>
            <div className="col-lg-3">
              <div className="box shadow-sm bg-light">
                <button onClick={handleSubmit} className="btn btn-success col-12"> БАТЛАХ </button>
              </div>
              <br/>
              <div className="box shadow-sm bg-light">
                <button className="btn btn-dark col-12">ЦУЦЛАХ </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </section>
  );
};

export default UserReqDetailmain;
