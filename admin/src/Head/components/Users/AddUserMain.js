import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";
import { createUser } from "../../Redux/Actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddUserMain = () => {
  const [name, setName] = useState("");
  const [organizationID, setOrganization] = useState("");
  const [subWorkID, setSubWork] = useState("");
  const [importance_id, setImportance] = useState("");
  const [planTime, setPlanTime] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const workCreate = useSelector((state) => state.workCreate);
  const { loading, error, workUser } = workCreate;

  useEffect(() => {
    if (workUser) {
      toast.success("Хүсэлт нэмэгдлээ", ToastObjects);
      dispatch({ type: WORKUSER_CREATE_RESET });
      setName("");
      setOrganization("");
      setSubWork("");
      setImportance("");
      setPlanTime("");
      setFile("");
      setDescription("");
    }
  }, [workUser, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createWorkUser(name, organizationID, subWorkID, importance_id, planTime, file,description));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
        <h2 className="content-title">Хүсэлт нэмэх</h2>
        <br/>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                  <label htmlFor="workUser_name" className="form-label">
                      Нэршил 
                    </label>
                    <input
                      type="text"
                      placeholder="Ажил даалгаврын нэршил оруулна уу"
                      className="form-control"
                      id="workUser_name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="workUser_organization" className="form-label">
                      Харилцагч байгууллага
                    </label>
                    <input
                      type="text"
                      placeholder="Харилцагч байгууллагаа сонгоно уу"
                      className="form-control"
                      id="workUser_organization"
                      required
                      value={organizationID}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="workUser_importance" className="form-label">
                      Чухал байдал
                    </label>
                    <input
                      type="text"
                      placeholder="Ажил даалгаврын чухал байдлыг оруулна уу"
                      className="form-control"
                      id="workUser_importance_id"
                      required
                      value={importance_id}
                      onChange={(e) => setImportance(e.target.value)}
                    />
                    {/* <select
                      type="select"
                      placeholder="Сонгоно уу"
                      className="form-control"
                      id="workUser_importance"
                      required
                      value={importance_id}
                      onChange={(e) => setImportance(e.target.value)}
                    /> */}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="workUser_date" className="form-label">
                      Огноо
                    </label>
                    <input
                      type="date"
                      placeholder="Огноо оруулна уу"
                      className="form-control"
                      id="workUser_planTime"
                      required
                      value={planTime}
                      onChange={(e) => setPlanTime(e.target.value)}
                    />
                  </div>                
                  <div className="mb-6">
                    <label htmlFor="workUser_date" className="form-label">
                      Хавсралт
                    </label>
                    <input
                      type="file"
                      placeholder="Хавсралт оруулна уу"
                      className="form-control"
                      id="workUser_file"
                      required
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                    />
                  </div>  
                  <div className="mb-6">
                    <label htmlFor="workUser_date" className="form-label">
                      Дэлгэрэнгүй
                    </label>
                    <input
                      type="text"
                      placeholder="Тайлбар оруулна уу"
                      className="form-control"
                      id="workUser_description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>      
                </div>
              </div>
            </div>
          </div>
          <div className="content-header">
            <Link to="/workUser" className="btn btn-danger text-white">
              Буцах
            </Link>
              <button type="submit" className="btn btn-primary">
              Хадгалах
              </button>
              <div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddUserMain;
