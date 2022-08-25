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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [job, setJob] = useState("");
  const [organizationID, setOrganization] = useState("");
  const [headID, setHead]= useState("");

  let orgs = [];
  let orgnames = [];


  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;
  const [name, setName] = useState("")

    
    const handleOrganization=(event)=>{
      const getOrganizationID=event.target.value;
      console.log(getOrganizationID);
    }
    useEffect(() => {
      const name = () => {
        fetch('http://localhost:8080/api/organization').then(res => res.json()).then(data => 
        
          setName(data)
        // data.forEach(item => {
        //   orgs.push(item);
        // })
        
    );
      }
      name()
    }, [])
    
    let arr = [];

    for(let i in name) {
      arr.push(name[i].organizationName)
    }
    console.log(arr)

    orgs.forEach(i => {
      orgnames.push(i.organizationName)
    });
    console.log(orgnames)

  useEffect(() => {
    
    setOrganization(orgs);
    if (user) {
      toast.success("Хэрэглэгч нэмэгдлээ", ToastObjects);
      dispatch({ type: USER_CREATE_RESET });
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone(0);
      setDepartment("");
      setJob("");
      setOrganization("");
      setHead("");

    }
  }, [user, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(firstname, lastname, email, phone, department, job, organizationID, headID));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
        <h2 className="content-title">Хэрэглэгч нэмэх</h2>
        <br/>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                  <label htmlFor="user_firstname" className="form-label">
                      Хэрэглэгчийн нэр
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_firstname"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_lastname" className="form-label">
                      Хэрэглэгчийн овог
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_lastname"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_email" className="form-label">
                      Хэрэглэгчийн имэйл
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_phone" className="form-label">
                      Хэрэглэгчийн утас
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_organization" className="form-label">
                      Харьяа байгууллага
                    </label>
                    <select
                      className="form-select"
                      id="user_organization"
                      required
                      onChange={(e) => handleOrganization(e)}
                    >
                      <option value="">Сонгох</option>
                      {arr.map(data => 
                        <option>{data}</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_department" className="form-label">
                    Хэрэглэгчийн алба хэлтэс
                    </label>
                    <select
                      className="form-select"
                      id="user_department"
                      required
                      onChange={(e) => handleOrganization(e)}
                    >
                      <option value="">Сонгох</option>
                      {arr.map(data => 
                        <option>{data}</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label">
                      Хэрэглэгчийн албан тушаал
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_job"
                      required
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                    />
                  </div>         
                  <div className="mb-6">
                    <label htmlFor="user_head" className="form-label">
                      Харьяа удирдлага
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="user_head"
                      required
                      value={headID}
                      onChange={(e) => setHead(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
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
