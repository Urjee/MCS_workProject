import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import {USERREQ_CREATE_RESET} from "../../Redux/Constants/requestConstants";
import {createUserReq} from "../../Redux/Actions/requestActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddUserReq=()=>{
    const [name, setName] = useState("");
    const [organizationID, setOrganization] = useState(0);
    const [subWorkID, setSubWork] = useState("");
    const [importanceID, setImportance]= useState(0);
    const [planTime, setPlanTime] = useState("");
    // const [file_name, setFile] = useState(0);
    const [description, setDescription] = useState("");
    const [orgname, setOrgName] = useState("");
    const [impName, setImpName] = useState("");
  
    const orgs = [];
    const orgnames = [];
    const imprts=[];
    
    const dispatch = useDispatch();

    const userReqCreate=useSelector((state)=>state.userReqCreate);
    const {loading, error, request}=userReqCreate;

    const handleOrganization=(event)=>{
      const getOrganizationID=event.target.value;
      console.log(getOrganizationID);
    }
    const handleImportance=(event)=>{
      const getImportanceD=event.target.value;
      console.log(getImportanceD);
    }
    useEffect(() => {
      const orgname = () => {
        fetch('http://localhost:8080/api/organization').then(res => res.json()).then(data => 
        setOrgName(data)    
    );
      }
      const impName=()=>{
        fetch('http://localhost:8080/api/importance').then(res => res.json()).then(impData =>
        setImpName(impData)
    );}
    orgname()
    impName()
    }, [])

    let arr=[];
    let arr1=[];

    for(let i in orgname) {
      arr.push(orgname[i].organizationName)
    }
    console.log(arr)

    orgs.forEach(i => {
      orgnames.push(i.organizationName)
    });
    console.log(orgnames)

    for(let i in impName) {
      arr1.push(i.importanceName)
    }
    console.log(arr1)
    imprts.forEach(i=> {
      imprts.push(i.importanceName)
    });
    console.log(imprts)

    // multiple file upload
      // const fileUploader= document.getElementById('file-uploader');
      // fileUploader.addEventListener('change', (event)=>{
      //   const files=event.target.files;
      //   console.log('files', files);

      //   const feedback= document.getElementById('feedback');
      //   const msg= `${files.length} файл амжилттай байршууллаа!`;
      //   feedback.innerHTML=msg;
      // });

    useEffect(() => {

        setOrganization(orgs);
        setImportance(imprts);
        if(request){
            toast.success("Ажил даалгавар нэмэгдлээ", ToastObjects);
            dispatch({type: USERREQ_CREATE_RESET});
            setName("");
            setOrganization(0);
            setSubWork("");
            setImportance(0);
            setPlanTime("");
            // setFile(0);
            setDescription("");
        }
    },[request,dispatch]);
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createUserReq(name, subWorkID, organizationID, importanceID, planTime,  description));
      
    };

    return (
        <>
        <Toast/>
        <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
        <h2 className="content-title">Ажил даалгавар нэмэх</h2>
        <br/>
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
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="userReq_subWork" className="form-label">
                      Дэд ажил нэмэх тоо
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_subWork"
                      value={subWorkID}
                      onChange={(e) => setSubWork(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="userReq_organization" className="form-label">
                      Харилцах байгууллага
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
                    <label htmlFor="userReq_importance" className="form-label">
                      Чухал байдал
                    </label>
                    <select
                      className="form-select"
                      id="user_importance"
                      required
                      onChange={(e) =>handleImportance(e)}
                    >
                      <option value="">Сонгох</option>
                      {arr1.map(impData => 
                        <option value={impData}>{impData}</option>
                      )}
                    </select>
              
                  </div>
                  <div className="mb-6">
                    <label htmlFor="userReq_planTime" className="form-label">
                      Төлөвлөгөөт огноо
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_planTime"
                      required
                      value={planTime}
                      onChange={(e) => setPlanTime(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-6">
                    <label htmlFor="userReq_file_id" className="form-label">
                      Хавсралт
                    </label>
                    <input
                      type="file"
                      placeholder="Type here"
                      className="form-control"
                      id="file-uploader"
                      value={file_name}
                      onChange={(e) => setFile(e.target.value)}
                      // multiple
                    />
                  </div> */}
                   <div className="mb-6">
                    <label htmlFor="userReq_description" className="form-label">
                      Тайлбар
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_description"
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
            <Link to="/userReq" className="btn btn-danger text-white">
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
export default AddUserReq;

