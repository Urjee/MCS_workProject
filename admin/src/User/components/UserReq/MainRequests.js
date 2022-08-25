import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../Redux/Actions/requestActions";
import ReqTable from "./ReqTable";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
const MainRequests = () => {
  const dispatch = useDispatch();

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;

  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

  const isAdmin = userinfo.isAdmin;

  const userid = window.localStorage.getItem("userid");

  useEffect(() => {
    dispatch(listRequest());
  }, [dispatch]);
  return (
    <div>
    { isAdmin=== 2 &&
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ажил даалгаврууд</h2>
        <div>
            <Link to="/addUserReq" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Ажил даалгавар нэмэх
          </Link>         
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
        <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
            <ReqTable requests={requests} 
            
            />
        
            )}
            </div>
      </div>
      </div>
    </section>
}
</div>
  );
};

export default MainRequests;
