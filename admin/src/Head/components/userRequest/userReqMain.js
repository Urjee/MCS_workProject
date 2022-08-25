import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRequest,

} from "../../Redux/Actions/requestActions";
import UserReq from "./userReq";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";

const MainRequests = (props) => {
  const dispatch = useDispatch();

  const headrequestList = useSelector((state) => state.headrequestList);
  const { loading, error, requests } = headrequestList;

  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

  const isAdmin = userinfo.isAdmin;

  useEffect(() => {
    dispatch(listRequest());
  }, [dispatch]);
  
  return (
    <div>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Хүсэлтүүдийн жагсаалт</h2>        
          <div>
          { isAdmin !== 3 && 
            <Link to="/addUserReq" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Ажил даалгавар нэмэх
          </Link> }        
        </div> 
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
        <div className="table-responsive">
        {/* {requests.map((request)=>(
              <UserReq request={request} key={request.userReqID}/>
              ))} */}
           {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <UserReq requests={requests} key={requests.userReqID}/>
            )} 
            </div>
      </div>
      </div>
      </section>
     </div>
  );
};

export default MainRequests;
