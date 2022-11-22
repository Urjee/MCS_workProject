import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const HeadUserEdit = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [departmentID, SetDepartmentID] = useState();
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [activeName, setActiveName] = useState("");
  const [UserID, setUserID] = useState();
  const [depName, setDepName] = useState("");
  const searchString = new URLSearchParams(window.location.search);
  const deps = [];
  const history = useHistory();

  const uID = searchString.get("id");

  useEffect(() => {
    const depName = () => {
      fetch("http://172.16.226.57:8080/api/department")
        .then((res) => res.json())
        .then((depData) => setDepName(depData));
    };
    depName();
  }, []);
  let arr1 = [];
  for (let i in depName) {
    arr1.push(depName[i].departmentName);
  }
  deps.forEach((i) => {
    deps.push(i.departmentName);
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    toast.success("Амжилттай хадгалагдлаа", ToastObjects);
    setTimeout(() => history.push("/headUser"), 2000);
    await axios
      .post("http://172.16.226.57:8080/api/headUEdit", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        departmentID: departmentID,
        departmentName: departmentName,
        job: job,
        UserID: uID,
        isActive: activeName === "0" ? 0 : 1,
      })
      .then((response) => {
        submitHandler(response.data);
      });
  };
  useEffect(() => {
    const userid = () => {
      fetch("http://172.16.226.57:8080/api/headUserDetails", {
        method: "POST",
        body: JSON.stringify({ UserID: uID }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setFirstname(res[0].firstname);
          setLastName(res[0].lastname);
          setEmail(res[0].email);
          setPhone(res[0].phone);
          SetDepartmentID(res[0].departmentID);
          setDepartmentName(res[0].departmentName);
          setJob(res[0].job);
          setUserID(res[0].UserID);
          setActiveName(res[0].activeName);
        });
    };
    userid();
  }, []);
  return (
    <>
      <Toast />
      <section className="content-main">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="content-header">
            <h2 className="content-title">Хэрэглэгчийн дэлгэрэнгүй</h2>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="user_firstName" className="form-label">
                      Хэрэглэгчийн нэр
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="mb-12">
                    <label htmlFor="user_lastName" className="form-label">
                      Овог
                    </label>
                    <input
                      type="text"
                      value={lastname}
                      className="form-control"
                      onChange={(e) => setLastName(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="user_email" className="form-label">
                      Имэйл
                    </label>
                    <input
                      value={email}
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="user_phone" className="form-label">
                      Утасны дугаар
                    </label>
                    <input
                      value={phone}
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-12">
                    <label htmlFor="user_departmentName" className="form-label">
                      Хэрэглэгчийн алба хэлтэс
                    </label>
                    <select
                      className="form-select"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    >
                      <option value="">{departmentName}</option>
                      {arr1.map((depData) => (
                        <option>{depData}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label">
                      Хэрэглэгчийн албан тушаал
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label">
                      Хэрэглэгчийн төлөв
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => setActiveName(e.target.value)}
                    >
                      <option>{activeName}</option>
                      <option value={1}>Идэвхтэй</option>
                      <option value={0}>Идэвхгүй</option>
                    </select>
                  </div>
                </div>
                <div className="content-header">
                  <Link to="/headUser" className="btn btn-dark col-3">
                    Буцах
                  </Link>
                  <button type="submit" className="btn btn-success col-3">
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default HeadUserEdit;
