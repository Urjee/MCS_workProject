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
  const [departmentID, setDepartment]= useState("")
  const [job, setJob] = useState("");
  const [organizationID, setOrganization] = useState("");
  const [headName, setHeadName]= useState("");
  const [name, setName] = useState("");
  const [depName, setDepName] = useState("");
  let orgs = [];
  let orgnames = [];
  let dep = [];

  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;
    
    const handleOrganization=(event)=>{
      const getOrganizationID=event.target.value;
      console.log(getOrganizationID);
    }
    const handleDepartment=(event)=>{
      const getDepartmentID=event.target.value;
      console.log(getDepartmentID);
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
      const department=()=>{
        fetch('http://localhost:8080/api/department').then(res => res.json()).then(depData =>
        setDepName(depData)
    );}
      name()
      department()
    }, [])

      // handleChange(event) {
      //   this.setState({ [event.target.name]: event.target.value });
      // }
    
    let arr = [];
    let arr1 = [];
    
    for(let i in name) {
      arr.push(name[i].organizationName)
      // arr.push(department[i].department)
    }
    console.log(arr)

    orgs.forEach(i => {
      orgnames.push(i.organizationName)
    });
    console.log(orgnames)

    for(let i in depName) {
      arr1.push(depName[i].departmentName)
    }
    console.log(arr1)

    dep.forEach(i=> {
      dep.push(i.departmentName)
    });
    console.log(dep)

  useEffect(() => {
    
    setOrganization(orgs);
    setDepartment(dep);
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
      setHeadName("");

    }
  }, [user, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(firstname, lastname, email, phone, departmentID, job, organizationID, headName));
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
                      onChange={(e) =>handleOrganization(e)}
                    >
                      <option value="">Сонгох</option>
                      {arr.map(data => 
                        <option value={data}>{data}</option>
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
                      onChange={(e) => handleDepartment(e)}
                    >
                      <option value="">Сонгох</option>
                      {arr1.map(depData => 
                        <option value={depData}>{depData}</option>
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
                      className="form-control"
                      id="user_head"
                      placeholder="Type here"

                      required
                      value={headName}
                      onChange={(e) => setHeadName(e.target.value)} 
                    />
                        {/* <select value={optionState} onChange={handleChange}>
                          <option value="1">Админ</option>
                          <option value="0">Хэрэглэгч</option>
                          <option value="3">Удирдлага</option>

                        </select> */}
                      {/* if(isAdmin==1){
                        <div onClick={()=> handleChangeCheckboxs(item.id)}>
                          
                          </div>
                      } */}
                   
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
