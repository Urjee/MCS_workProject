import React , { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listReq } from "../../Redux/Actions/workActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import ReqAdminPro from "./ReqAdminPro";
import Request from "./Request";

const ReqAdminMain = () => {
  const dispatch = useDispatch();

  const workList = useSelector((state) => state.workList);
  const { loading, error, requests } = workList;
  const [searchTerm, setSearch] = useState("");
  const keys=["name", "firstname","importanceName", "stateName", "organizationName", "realTime","startDate", "endDate","file_name"]

  const search = (requests) => {
    return requests.filter((request) => 
    keys.some((key) => request[key].toLowerCase().includes(searchTerm)))
  }
  useEffect(() => {
    dispatch(listReq());
   }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ажил даалгавар</h2>
      </div>
       {/* Ирсэн хүсэлтүүд */}
       <Request/>
       <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Хайх..."
                className="form-control"
                onChange={(e) => 
                  setSearch(e.target.value)
                }
              />             
            </div>            
          </div>
        </header>
       <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <ReqAdminPro requests={search(requests)} />
            )}
            </div>
          </div>
          </div>
    </section>
  );
};


export default ReqAdminMain;
