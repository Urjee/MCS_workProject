import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import axios from "axios";

const EditRequest = () => {
  const searchString = new URLSearchParams(window.location.search);
  const reqID = searchString.get("id");

  const [name, setName] = useState("");
  const [impName, setImpName] = useState("");
  const [importanceName, setImportanceName] = useState("");
  const [planTime, setPlanTime] = useState("");
  const [file_name, setFileName] = useState([]);
  const [description, setDescription] = useState("");
  const [stateName, setStateName] = useState("");
  const [stteName, setStteName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [percentOfPerform, setPercentOfperform] = useState(0);
  const [firstname, setFirstname] = useState();
  const [fileRemove, setFileRemove] = useState(false);
  const [UserID, setUserID] = useState();
  const [developerName, setDeveloperName] = useState("");
  const history = useHistory();
  const states = [];
  const imprts = [];
  const [filess, setFiless] = useState([]);
  const arr=[];
  const requestCreate = useSelector((state) => state.requestCreate);
  const { loading, error } = requestCreate;

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
  imprts.forEach((i) => {
    imprts.push(i.importanceName);
  });

  useEffect(() => {
    const stteName = () => {
      fetch("http://172.16.226.57:8080/api/state")
        .then((res) => res.json())
        .then((stateData) => setStteName(stateData));
    };
    stteName();
  }, []);
  let arr2 = [];
  for (let i in stteName) {
    arr2.push(stteName[i].stateName);
  }
  states.forEach((i) => {
    states.push(i.stateName);
  });

  useEffect(() => {
    const developerName = async (req, res) => {
      fetch("http://172.16.226.57:8080/api/developer").then((res) => {
        const data = res.json();
        data.then((res) => {
          setDeveloperName(res);
        });
      });
    };
    developerName();
  }, []);

  let arr0 = [];
  for (let i in developerName) {
    arr0.push(developerName[i].firstname);
  }
  const realTime = ((new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000 / 60 / 60);
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put("http://172.16.226.57:8080/api/requestUpdate", {
        planTime: planTime,
        realTime: realTime,
        startDate: startDate,
        endDate: endDate,
        percentOfPerform: Number(percentOfPerform),
        firstname: firstname,
        userReqID: Number(reqID),
        stateID: 4,
        file_name: file_name,
        UserID: UserID,
      })
      .then((response) => {
        toast.success("Амжилттай хадгалагдлаа");
        submitHandler(response.data);
      });
    setTimeout(() => history.push("/requestProgrammer"), 2000);
  };
  useEffect(() => {
    const userid = () => {
      fetch("http://172.16.226.57:8080/api/requestEdit", {
        method: "POST",
        body: JSON.stringify({ userReqID: reqID }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setName(res[0][0].name);
          setImportanceName(res[0][0].importanceName);
          setFirstname(res[0][0].firstname);
          setPlanTime(res[0][0].planTime);
          setDescription(res[0][0].description);
          setStateName(res[0][0].stateName);
          setStartDate(res[0][0].startDate);
          setEndDate(res[0][0].endDate);
          setPercentOfperform(res[0][0].percentOfPerform);
          setFileRemove(res[0][0].fileRemove);
          setUserID(res[0][0].UserID);
          setFiless(res[0])
          for(let i = 0; i < res[0].length; i++) {
            setFileName(res[0][i].file_name);
            arr.push(res[0][i].file_name)
          };
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
  const fileButton = () => {
    window.open(`http://172.16.226.57:8080/images/${file_name}`, "_blank");
    history.push("/requestProgrammer");
  };
  return (
    <>
      <Toast />
      <section className="content-main">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="content-header">
            <h2 className="content-title">Ирсэн хүсэлтийн дэлгэрэнгүй</h2>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="userReq_name" className="form-label">
                      Ажил даалгаврын нэр
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName}
                    />
                  </div>
                  <div className="mb-12">
                    <label
                      htmlFor="userReq_importanceName"
                      className="form-label"
                    >
                      Ажлын төрөл
                    </label>
                    <input
                      type="text"
                      value={importanceName}
                      className="form-select"
                      onChange={(e) => setImportanceName}
                    ></input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="userReq_stateName" className="form-label">
                      Төлөв
                    </label>
                    <input
                      value={stateName}
                      className="form-select"
                      onChange={(e) => setStateName}
                    ></input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="userReq_description" className="form-label">
                      Тайлбар
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription}
                  />
                  <div id="form-control" className="mb-12">
                      <i className="icon fas fa exit"></i>
                      <label id="input1label" className="form-label">
                        Хавсаргасан файл
                      </label>
                            {
                              filess.map((file) => 
                              <button className="btn btn-file cursor-pointer text-black"onClick={() => window.open(`http://172.16.226.57:8080/images/${file.file_name}`, "_blank")}>
                              {file.file_name?
                              <input
                                className="form-control"
                                value={file.file_name}
                                multiple /> 
                                : 'Хавсаргасан файл байхгүй'}
                              </button>
                              )
                            }
                      </div>
                  <div className="mb-12">
                    <label htmlFor="userReq_planTime" className="form-label">
                      Төлөвлөгөөт хугацаа
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={planTime}
                      onChange={(e) => setPlanTime(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-12">
                    <label>Эхэлсэн огноо</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-12">
                    <label>Дуусах огноо</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-12">
                    <label className="form-label">
                      Бодит цаг
                    </label>
                    <input
                      type=""
                      className="form-control"
                      value={realTime}
                    />
                  </div>
                  <div className="mb-12">
                    <label className="form-label" htmlFor="user_developerID">
                      Гүйцэтгэгч
                    </label>
                    <select
                      className="form-select"
                      id="user_developerID"
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                    >
                      <option value="">Сонгох</option>
                      {arr0.map((userData) => (
                        <option value={userData}>{userData}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-12">
                    <label>Ажлын гүйцэтгэл</label>
                    <input
                      type="text"
                      className="form-control"
                      value={percentOfPerform}
                      onChange={(e) => setPercentOfperform(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="content-header">
                    <Link to="/workRequests" className="btn btn-dark col-3">
                      Буцах
                    </Link>
                    <button type="submit" className="btn btn-success col-3">
                      Хадгалах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditRequest;
