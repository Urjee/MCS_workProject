import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";
import { addUser } from "../../Redux/Actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddUsers = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment]= useState("")
  const [job, setJob] = useState("");
  const [headName, setHeadName]= useState("");
  const [depName, setDepName] = useState("");
  const [admin, setAdmin] = useState("");
  const [headd, setHead] = useState("");
  const [depID, setDepID] = useState();
  const [UserID, setUserID] = useState();
  const [organizationID, setOrganizationID] = useState();
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState();

  let dep = [];
  let head=[];
  const dispatch = useDispatch();
  const history = useHistory();

  const headCreateUser = useSelector((state) => state.headCreateUser);
  const { loading, error, user } = headCreateUser;
    
    useEffect(() => {
    
      const department = ()=>{
        fetch('http://172.16.226.57:8080/api/department')
        .then(res => res.json())
        .then(depData => setDepName(depData));
      }
      const head = async() => {
        fetch("http://172.16.226.57:8080/api/head")
        .then(res => res.json())
        .then(data => setHeadName(data))
        .catch(function (error) {
          console.log(error);
        });
      };
      department()
      head()
      setDepID(JSON.parse(window.localStorage.getItem('userinfo')).departmentID)
      setOrganizationID(JSON.parse(window.localStorage.getItem('userinfo')).organizationID)
      setUserID(JSON.parse(window.localStorage.getItem('userinfo')).UserID)
    }, [])

    let arr1 = [];
    let arr2 = [];

    //alba heltes
    for(let i in depName) {
      arr1.push(depName[i].departmentName)
    }
    // console.log(arr1)

    dep.forEach(i=> {
      dep.push(i.departmentName)
    });
    //udirdlaga buyu head
    for(let i in headName) {
      arr2.push(headName[i].firstname)
    }
    head.forEach(i => {
      head.push(i.headName)
    });
  useEffect(() => {   
    if (user) {
      toast.success("Хэрэглэгч нэмэгдлээ", ToastObjects);
      dispatch({ type: USER_CREATE_RESET });
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone();
      setJob("");
      setDepartment(dep);
      setHead(headd);
      setAdmin(admin);
      setPassword();
      setIsActive();
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addUser(UserID, password, firstname, lastname, phone, job, email, admin, organizationID, headd, depID, isActive));
    setTimeout(() => history.push('/headUser'), 2000)

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
                    
                  <div className="mb-6">
                    <label htmlFor="user_department" className="form-label">
                    Хэрэглэгчийн алба хэлтэс
                    </label>
                    <select
                      className="form-select"
                      id="user_department"
                      required
                      onChange=
                      {(e) =>
                        { setDepartment(e.currentTarget.value)
                        //  filterChange(e.currentTarget.value)
                      }
                    }
                    >
                      <option value="">Сонгох</option>
                      {arr1.map(depData => 
                        <option value={depData}>{depData}</option>
                      )}
                    </select>
                    </div>
                 
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

export default AddUsers;
