import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import "../../../Admin/components/Request/RequestTable";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const DetailsHeadReq = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const searchString = new URLSearchParams(window.location.search);
  const [impName, setImpName] = useState("");
  const [importanceName, setImportanceName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [stateName, setStateName] = useState("");
  const [file_name, setFileName] = useState([]);
  const [createDate, setCreateDate] = useState();
  const [files, setFiles] = useState([]);
  const [planTime, setPlanTime] = useState("");
  const [view, setView] = useState(false);
  const history = useHistory();
  const headRequestList = useSelector((state) => state.headRequestList);
  const { headReqs } = headRequestList;
  const [filess, setFile] = useState([]);
  const arr = [];

  useEffect(() => {
    const impName = () => {
      fetch("http://172.16.226.57:8080/api/importance")
        .then((res) => res.json())
        .then((impData) => setImpName(impData));
    };
    impName();
  }, []);
  let arr1 = [];
  for (let i in impName) {
    arr1.push(impName[i].importanceName);
  }
  useEffect(() => {
    const stateName = () => {
      fetch("http://172.16.226.57:8080/api/state").then((res) => res.json());
    };
    stateName();
  }, []);
  const userReqID = searchString.get("id");
  const statename = searchString.get("name");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    data.append("name", name);
    data.append("importanceName", importanceName);
    data.append("organizationName", organizationName);
    data.append("stateName", stateName);
    data.append("description", description);
    data.append("UserReqID", userReqID);
    data.append("planTime", planTime);
    data.append("file_name", file_name);
    data.append("createDate", createDate);
    submitHandler(data);
  };
  useEffect((req, res) => {
    const userid = () => {
      fetch("http://172.16.226.57:8080/api/headReqDetail", {
        method: "POST",
        body: JSON.stringify({ userReqID: userReqID }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setName(res[0].name);
          setDescription(res[0].description);
          setImportanceName(res[0].importanceName);
          setOrganizationName(res[0].organizationName);
          setStateName(res[0].stateName);
          setPlanTime(res[0].planTime);
          setCreateDate(res[0].createDate);
          
          setFile(res)
          for(let i = 0; i < res[0].length; i++) {
            setFileName(res[i].file_name);
            arr.push(res[i].file_name)
          };

          if (files) {
            setView(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    userid();
  }, []);

  const handleDownload = () => {
    axios({
      url: `http://172.16.226.57:8080/images/${file_name}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
    });
  };
  const handleConfirm = async () => {
    await fetch("http://172.16.226.57:8080/api/userReqUpdate", {
      method: "POST",
      body: JSON.stringify({
        userReqID: userReqID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("?????????????????? ????????????????????", ToastObjects);
    setTimeout(() => history.push("/headReqs"), 2000);
  };
  const handleCancel = async () => {
    await fetch("http://172.16.226.57:8080/api/userReqCancel", {
      method: "POST",
      body: JSON.stringify({
        userReqID: userReqID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("???????????? ????????????????????", ToastObjects);
    setTimeout(() => history.push("/headReqs"), 2000);
  };

  return (
    <>
      <Toast />
      <section className="content-main">
        <form onSubmit={submitHandler} encType="multiple/form-data">
          <div className="content-header">
            <Link to="/headReqs" className="btn btn-dark text-white">
              ??????????
            </Link>
          </div>
          <div className="card">
            <header className="card-header p-3 Header-green">
              <div className="row align-items-center ">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="far fa-calendar-alt mx-2"></i>
                    <b className="text-white">
                      {moment(headReqs.createdAt).format("llll")}
                    </b>
                  </span>
                </div>
              </div>
            </header>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-9">
                  <div className="table-responsive">
                    <table className="table border table-lg">
                      <thead>
                        <tr>
                          <th scope="col">??????</th>
                          <th scope="col">?????????? ??????????</th>
                          <th scope="col">??????????????????????</th>
                          <th scope="col">????????????????</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr key={userReqID}>
                          <td>{name}</td>
                          <td>{importanceName}</td>
                          <td>{description}</td>
                          <td>
                          {
                              filess.map((file) => 
                              <button className="btn btn-file cursor-pointer text-black"onClick={() => window.open(`http://172.16.226.57:8080/images/${file.file_name}`, "_blank")}>
                              <input
                                className="form-control"
                                value={file.file_name}
                                multiple />
                          </button>
                              )
                            }
                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                {statename === "?????????????????? ??????????????????" ? (
                  <div className="col-lg-3">
                    <div className="box shadow-sm bg-light">
                      <button
                        className="btn btn-success col-12"
                        onClick={handleConfirm}
                      >
                        ????????????
                      </button>
                    </div>
                    <br />
                    <div className="box shadow-sm bg-light">
                      <button
                        className="btn btn-dark col-12"
                        onClick={handleCancel}
                      >
                        ????????????
                      </button>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
            
          </div>
        </form>
      </section>
    </>
  );
};

export default DetailsHeadReq;
