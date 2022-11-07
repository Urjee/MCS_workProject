import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import axios  from "axios";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";

const UserEdit = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [organizationName, setOrganizationName] = useState("");
    const [isActive, setIsActive] = useState();
    const [activeName, setActiveName] = useState();

    const [departmentName, setDepartmentName] = useState("");
    const [headName, setHeadName] = useState("");
  
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const [depName, setDepName] = useState("");
    const [headNme, setHeadNme] = useState("");
    const [active, setActive] = useState("");

    const [isAdmin, setisAdmin] = useState("");
    const [headd, setHead] = useState("");
    const [filters, setFilters] = useState([]);
    const searchString = new URLSearchParams(window.location.search);
    const [UserID, setUserID] = useState();
    const [orgName, setOrgName] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const [organizationID, setOrganizationID] = useState();

    const userCreate = useSelector((state) => state.userCreate);
    const { loading, error, users } = userCreate;
    setOrganizationID(JSON.parse(window.localStorage.getItem('userinfo')).organizationID)


    const uID = searchString.get("id")
    useEffect(() => {
      const organization = () => {
        fetch('http://172.16.226.57:8080/api/organization')
        .then(res => res.json())
        .then(orgData => setOrgName(orgData) )
      }
        organization()},
        [])
      let arr = [];
        for(let i in orgName) {
          arr.push(orgName[i].organizationName)
        }
    useEffect(() => {
      const department = ()=>{
        fetch('http://172.16.226.57:8080/api/department')
        .then(res => res.json())
        .then(depData => setDepName(depData))
       }
        department()}, [])
        let arr1 = [];
        for(let i in depName) {
          arr1.push(depName[i].departmentName)
        }
    useEffect(() => {
      const head = async() => {
        await fetch("http://172.16.226.57:8080/api/head")
        .then(res => res.json())
        .then(headData => setHeadNme(headData))
        }
        head()},[])
        let arr2 = [];
        for(let i in headNme) {
          arr2.push(headNme[i].headName)
        }    
  //  useEffect(() =>{
  //   const activeUser = async() => {
  //     await fetch("http://172.16.226.57:8080/api/user", {
  //     method: "POST",
  //       body: 
  //         JSON.stringify({organizationID: organizationID}),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     .then(res => res.json())
  //   }
  //   activeUser()},[])
  //   let arr3 = [];
  //   for( let i in active) {
  //     arr3.push(active[i].activeName)
  //  }
    const filterChange = (orgName) => {
      setFilters(headNme.filter(e => e.organizationName === orgName));
    }
    useEffect(() => {
      if(users){
        dispatch({type: USER_CREATE_RESET})
        setName("");
        setFirstname("");
        setLastname("");
        setEmail();
        setPhone();
        setOrganizationName(orgName);
        setDepartmentName(depName);
        setHeadName(headNme);
        setActiveName(activeName);
        setJob("");
        setisAdmin(isAdmin);
        setIsActive(isActive);
      }
    }, [users, dispatch]);

    const submitHandler = async(e) =>{   
      
      e.preventDefault(); 
      await axios.post('http://172.16.226.57:8080/api/userEdit', 
      { 
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        organizationName: organizationName,
        departmentName: departmentName,
        organizationID: organizationID,
        job: job,
        UserID: uID,
        headName: headName,
        isAdmin:isAdmin,
        isActive: activeName === '0' ? 0 : 1,
      })
      .then((response) => {
        toast.success('Амжилттай хадгалагдлаа');
        submitHandler(response.data)
      });
      setTimeout(() => history.push('/users'), 2000)
  };
    useEffect(() => {
    const details = () => {
      fetch('http://172.16.226.57:8080/api/userDetails', {
        method: "POST",
        body: 
          JSON.stringify({UserID: uID}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        setFirstname(res[0].firstname)
        setLastname(res[0].lastname)
        setEmail(res[0].email)
        setPhone(res[0].phone)
        setDepartmentName(res[0].departmentName)
        setOrganizationName(res[0].organizationName)
        setHeadName(res[0].headName)
        setActiveName(res[0].activeName)
        setJob(res[0].job)
        setisAdmin(res[0].isAdmin)
        setUserID(res[0].uID)
        setIsActive(res[0].isActive)
      })
      .catch(function (error){
        console.log(error);
      });
    };
    details()
  }, [])  

  
  console.log(activeName);
  console.log(isActive);

  return (
  <>
  <Toast/>
  <section className="content-main">
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <div className="content-header">
            <h2 className="content-title">Хэрэглэгчийн дэлгэрэнгүй</h2>        
      </div>
      <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
                { loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="user_firstName" className="form-label">
                      Хэрэглэгчийн нэр
                    </label>
                    <input type="text" className="form-control" value={firstname} 
                      onChange={(e) =>setFirstname(e.target.value)} />
                  </div>
                  <div className="mb-12">
                    <label htmlFor="user_lastName" className="form-label">
                      Овог
                    </label>
                    <input type="text" value={lastname} className="form-control"
                          onChange={(e) =>setLastname(e.target.value)}>
                    </input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="user_email" className="form-label">
                      Имэйл
                    </label>
                    <input  value={email} className="form-control"
                      onChange={(e) =>setEmail(e.target.value)}>
                      </input>
                  </div>              
                    <div className="mb-12">
                       <label htmlFor="user_phone" className="form-label">
                        Утасны дугаар
                       </label>
                       <input  value={phone} className="form-control"
                         onChange={(e) =>setPhone(e.target.value)}>
                      </input>
                    </div>
                    <div className="mb-12">
                        <label htmlFor="user_organizationName" className="form-label">
                          Харьяа байгууллага </label>
                          <select className="form-select" value = {organizationName}
                           onChange={(e) =>
                            {
                              setOrganizationName(e.currentTarget.value)
                                  filterChange(e.target.value)
                            }}>
                             <option>{organizationName}</option>
                            {
                            arr.map(orgData => 
                              <option value={orgData}>{orgData}</option>)
                            }
                        </select>    
                    </div>   
                    <div className="mb-12">
                         <label htmlFor="user_department" className="form-label">
                          Хэрэглэгчийн алба хэлтэс
                        </label>
                        <select className="form-select" value={departmentName}
                            onChange={(e) =>{ setDepartmentName(e.target.value)}}>
                        <option value="">{departmentName}</option>
                        {arr1.map(depData => 
                            <option value={depData}>{depData}</option>
                        )}
                        </select>
                     </div>
                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label">
                      Хэрэглэгчийн албан тушаал
                    </label>
                    <input type="text" className="form-control" value={job}
                      onChange={(e) => setJob(e.target.value)}>
                      </input>
                  </div>      
                  <div className="mb-6">
                    <label htmlFor="user_job" className="form-label"> 
                      Хэрэглэгчийн төлөв
                    </label>
                    <select className="form-control"
                      onChange={(e) => {
                        setActiveName(e.target.value)
                      }}>
                        <option>{activeName}</option>
                        <option value={1}>Идэвхтэй</option>
                        <option value={0}>Идэвхгүй</option>
                      </select>
                  </div>  
                  <div className="mb-6">
                    <label htmlFor="user_head" className="form-label">
                    Хэрэглэгчийн төрөл </label>
                    <select className="form-select"
                      onChange={e =>{ setHeadName(e.target.value)}}>
                      <option>{headName}</option>
                      <option value={1}>Админ</option>
                      <option value={2}>Хэрэглэгч</option>
                      <option value={3}>Удирдлага</option>
                    </select>
                  </div>
                  { headName == 2 ?
                    <div className="mb-6">
                      <label htmlFor="user_headName" className="form-label">
                        Удирдлага сонгох
                      </label>
                      <select
                        className="form-select"
                        id="user_headName"
                        value={headd}
                        onChange={(e) => setHead(e.target.value)
                        } >
                        <option>Сонгох</option>
                        {
                          filters.map(e => {
                            return (
                              <option value={e.firstname}>{e.firstname}</option>
                            )
                          })
                        }    
                      </select>
                    </div>
                  : null
                  }
                </div> 
                       
                <div className="content-header">
                    <Link to="/users" className="btn btn-dark col-3">
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

export default UserEdit;
