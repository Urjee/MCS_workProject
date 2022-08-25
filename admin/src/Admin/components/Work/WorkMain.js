import React , { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listWork } from "../../Redux/Actions/workActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Works from "./Works";
import Request from "./Request";

const WorkMain = () => {
  const dispatch = useDispatch();

  const workList = useSelector((state) => state.workList);
  const { loading, error, works } = workList;

  useEffect(() => {
    dispatch(listWork());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ажил даалгавар</h2>
      </div>
       {/* Ирсэн хүсэлтүүд */}
       <Request/>
       <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Works works={works} />
            )}
            </div>
          </div>
          </div>
    </section>
  );
};

export default WorkMain;
