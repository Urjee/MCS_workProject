import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";
import { adminCreateUser } from "../../Redux/Actions/userActions";
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
  const [departmentName, setDepartmentName]= useState("")
  const [job, setJob] = useState("");
  const [jobTitle, setJobTile] = useState();
  const [jobTitleName, setJobTitleName] = useState("");

  const [organizationName, setOrganization] = useState("");
  const [headName, setHeadName]= useState("");
  const [name, setName] = useState([]);
  const [depName, setDepName] = useState("");
  const [admin, setAdmin] = useState("");
  const [headd, setHead] = useState("");
  const [password, setPassword] = useState("");
  const [filters, setFilters] = useState([]);
  const [UserID, setUserID] = useState();
  const [isActive, setIsActive] = useState();
  const history = useHistory();

  let orgs = [];
  let dep = [];
  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;
    
    useEffect(() => {
      const name = () => {
        fetch('http://172.16.226.57:8080/api/organization')
        .then(res => res.json())
        .then(data => 
        setName(data)
        );}
      const department = ()=>{
        fetch('http://172.16.226.57:8080/api/department')
        .then(res => res.json()).then(depData =>
        setDepName(depData)
             );
      }
      const head = async() => {
        await fetch("http://172.16.226.57:8080/api/head")
        .then(res => res.json())
        .then(data => setHeadName(data))
        .catch(function (error) {
          console.log(error);
        });
      };
     
      name()
      department()
      head()
      setUserID(JSON.parse(window.localStorage.getItem('userinfo')).UserID)
    }, [])

    let arr = [];
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    //baiguullaga
    for(let i in name) {
      arr.push(name[i].organizationName)
    }
    //alba heltes
    for(let i in depName) {
      arr1.push(depName[i].departmentName)
    }
    //udirdlaga buyu head
    for(let i in headName) {
      arr2.push(headName[i].firstname)
    }
    for(let i in jobTitleName ) {
      arr3.push(jobTitleName[i].jobTitleName)
    }
    const filterChange = (name) => {
      setFilters(headName.filter(e => e.organizationName === name));
    }

  useEffect(() => {
    if (user) {
      dispatch({ type: USER_CREATE_RESET });
      setPassword();
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone();
      setJob("");
      setOrganization(orgs);
      setDepartmentName(dep);
      setHead(headd);
      setAdmin(admin);
      setIsActive();
      setJobTile();
      setJobTitleName(jobTitleName);
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("?????????????????? ??????????????????", ToastObjects);
    dispatch(adminCreateUser(password, firstname, lastname, email, phone, departmentName, job, organizationName, headd, admin, isActive, jobTitle, jobTitleName));
    setTimeout(() => history.push('/users'), 2000)
  }; 
  
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
        <h2 className="content-title">?????????????????? ??????????</h2>
        <br/>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                  <label htmlFor="user_firstname" className="form-label">
                      ???????????????????????? ??????
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
                      ???????????????????????? ????????
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
                      ???????????????????????? ??????????
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
                      ???????????????????????? ????????
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
                      ???????????? ??????????????????????
                    </label>
                    <select
                      className="form-select"
                      id="user_organization"
                      required
                      onChange={
                        (e) => {
                          setOrganization(e.currentTarget.value)
                          filterChange(e.target.value)
                        } }>
                      <option>????????????</option>
                      {arr.map(data => 
                        <option value={data}>{data}</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_department" className="form-label">
                    ???????????????????????? ???????? ????????????
                    </label>
                    <select
                      className="form-select"
                      id="user_department"
                      required
                      onChange=
                      {(e) =>
                        { setDepartmentName(e.target.value)
                      } }>
                      <option value="">????????????</option>
                      {arr1.map(depData => 
                        <option value={depData}>{depData}</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label">
                      ???????????????????????? ?????????? ????????????
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
                  <div hidden className="mb-6">
                    <label htmlFor="user_jobTitle" className="form-label">
                      ?????????? ???????????????? ??????????
                    </label>
                    <select
                      type="select" className="form-select" id="user_jobTitle" 
                      value={jobTitleName}
                      onChange={e => {
                        setJobTitleName(e.target.value)
                      }}>
                      <option>????????????</option>
                      <option value={0}>?????????????? ??????????????</option>
                      <option value={1}>???????????? ??????????????</option>
                    </select>
                  </div>    
                  <div className="mb-6">
                    <label htmlFor="user_head" className="form-label">
                    ???????????????????????? ?????????? ????????????
                    </label>
                    <select
                      type="select" className="form-select" id="user_head" required 
                      value={admin}
                      onChange={e => {
                        setAdmin(e.target.value)
                      }}>
                      <option>????????????</option>
                      <option value={1}>??????????</option>
                      <option value={2}>??????????????????</option>
                      <option value={3}>??????????????????</option>
                    </select>
                  </div>
                  { admin == 2 ?
                    <div className="mb-6">
                      <label htmlFor="user_headName" className="form-label">
                        ?????????????????? ????????????
                      </label>
                      <select
                        className="form-select"
                        id="user_headName"
                        value={headd}
                        onChange={(e) => setHead(e.target.value)
                        } >
                        <option>????????????</option>
                        {
                          filters.map(e => {
                            return (
                              <option>{e.firstname}</option>
                            )
                          })
                        }    
                      </select>
                    </div>
                  : null
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              ??????????
            </Link>
              <button type="submit" className="btn btn-primary">
              ????????????????
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