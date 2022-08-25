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
    // const [subWorkID, setSubWork] = useState("");
    // const [importance, setImportance] = useState([]);
    const [importanceID, setImportance]= useState(0);
    const [planTime, setPlanTime] = useState("");
    const [file_id, setFile] = useState(0);
    const [description, setDescription] = useState("");

    // const orgs = [];
    // const imprts=[];
    
    const dispatch = useDispatch();

    const userReqCreate=useSelector((state)=>state.userReqCreate);
    const {loading, error, request}=userReqCreate;


    // multiple file upload
      const fileUploader= document.getElementById('file-uploader');
      fileUploader.addEventListener('change', (event)=>{
        const files=event.target.files;
        console.log('files', files);

        const feedback= document.getElementById('feedback');
        const msg= `${files.length} файл амжилттай байршууллаа!`;
        feedback.innerHTML=msg;
      });

        /*SELECT
    useEffect( ()=>{
      const getimportance=async()=>{
        const resimportance=await fetch("http://localhost:8080/api/importance/");
        const resimpor= await resimportance.json();
        setImportance(await resimpor);
      }
      getimportance();
    },[]);

    const handleimportance=(event)=>{
      const getimportanceID=event.target.value;
      setImportanceID(getimportanceID);
    }
    useEffect( ()=>{
      const getstate=async()=>{
        const state= await fetch(`http://localhost:8080/api/importance/state/${importanceID}`);
        const resst= await state.json();
        setImportance(await resst);
      }
      getstate();
    },[importanceID]);

    // useEffect(()=>{
    //   const getState=async()=>{
    //     const res=await fetch('http://localhost:8080/api/organization').then(res => res.json()).then(data => orgs.push(data));
    //     // const getcon= await res.json();
    //     // console.log(getcon);
    //     // setOrganization(await getcon);

    //   }
    //   getState();
    // },[]);
    // const handleOrganization=(event)=>{
    //   const getOrganizationID=event.target.value;
    //   console.log(getOrganizationID);
    // }


    // fetch('http://localhost:8080/api/organization').then(res => res.json()).then(data => orgs.push(data))
    // fetch('http://localhost:8080/api/importance').then(res => res.json()).then(data => imprts.push(data))

*/
    useEffect(()=>{
        if(request){
            toast.success("Ажил даалгавар нэмэгдлээ", ToastObjects);
            dispatch({type: USERREQ_CREATE_RESET});
            setName("");
            setOrganization(0);
            // setSubWork("");
            setImportance(0);
            setPlanTime("");
            setFile(0);
            setDescription("");
        }
    },[request,dispatch]);
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createUserReq(name, organizationID, importanceID, planTime, file_id, description));
      
    };
    // console.log(orgs)
    // console.log(imprts)
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
                  <div className="mb-6">
                    <label htmlFor="userReq_organization" className="form-label">
                      Харилцах байгууллага
                    </label>
                     <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_organization"
                      required
                      value={organizationID}
                      onChange={(e) => setOrganization(e.target.value)} />
                  
                    {/* <select
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_organization"
                      required
                      onChange={(e) => setOrganization(e.target.value)}
                      > 
                       <option value="0">Сонгох</option>
                        {
                          orgs.map( (orgGet)=>(
                            <option key={orgGet.organizationName} value={orgGet.organizationName}>
                              {orgGet.organizationName}
                            </option>
                          ))
                        }
                        </select>
                       */}

                        {/* {orgs.map(orgz => orgz.map(org => {
                          return (<option>{org.organizationName}</option>)
                        }))} */}
                    {/* </select> */}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="userReq_importance" className="form-label">
                      Чухал байдал
                    </label>

                    {/* songodog bolgoh */}
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_importance"
                      required
                      value={importanceID}
                      onChange={(e) => setImportance(e.target.value)}
                    />
                      {/* <select className="form-select" name="state" onChange={(e)=>handleimportance(e)}>
                        <option value=""> songo</option>
                        {
                          importance.map( (getimportance, index)=>{
                            <option key={index} value={getimportance.name}>{getimportance.name}</option>
                          })
                        }
                      </select> */}

                    {/* <select
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_importance"
                      required
                      onChange={(e) => setImportance(e.target.value)}
                    >
                      <option value="0">Сонгох</option>
                        {imprts?.map(impt => impt?.map(imprt => {
                          return (<option>{imprt?.name}</option>)
                        }))}
                    </select> */}
                  </div>
                        {/* <div className="mb-6">
                    <label htmlFor="userReq_subWork" className="form-label">
                      Дэд ажил бүртгэх
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_subWork"
                      required
                      value={subWorkID}
                      onChange={(e) => setSubWork(e.target.value)}
                    /> */}
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
                  <div className="mb-6">
                    <label htmlFor="userReq_file_id" className="form-label">
                      Хавсралт
                    </label>
                    <input
                      type="file"
                      placeholder="Type here"
                      className="form-control"
                      id="file-uploader"
                      value={file_id}
                      onChange={(e) => setFile(e.target.value)}
                      multiple
                    />
                  </div>
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

