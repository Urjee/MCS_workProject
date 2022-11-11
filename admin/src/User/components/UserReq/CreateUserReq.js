import React, { useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import axios from "axios";

const CreateUserReq = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [importanceName, setImportanceName]= useState("");
    const [description, setDescription] = useState("");
    const [impName, setImpName] = useState("");
    const [stateID, setStateID] = useState(0);
    const [stteName, setStteName] = useState("");
    const [orgID, setOrgID] = useState();
    const history = useHistory();
    const [firstname, setFirstname] = useState();
    const [phone, setPhone]= useState("");
    const dispatch = useDispatch();

    const userReqCreate = useSelector((state) => state.userReqCreate);
    const { userReq } = userReqCreate;
    useEffect(() => {
      const impName = () => {
        fetch('http://172.16.226.57:8080/api/importance')
        .then(res => res.json())
        .then(impData =>
        setImpName(impData)
        );
      }      
    impName()
    }, [])
    let arr1=[];
    for(let i in impName) {
      arr1.push(impName[i].importanceName)
    }
    useEffect(()=> {
      const stteName = () => {
        fetch('http://172.16.226.57:8080/api/state')
        .then(res => res.json())
        .then(stateData => setStteName(stateData));
      }
      stteName()
      setOrgID(JSON.parse(window.localStorage.getItem('userinfo')).organizationID)
      setFirstname(JSON.parse(window.localStorage.getItem('userinfo')).firstname)
      setPhone(JSON.parse(window.localStorage.getItem('userinfo')).phone)

    },       
    [])
    let arr2=[];
    for(let i in stteName) {
      arr2.push(stteName[i].stateName)
    }
   
    const submitHandler = (e) =>{
        e.preventDefault();
        const data = new FormData();
        for(let i=0; i < files.length; i++) {
          data.append('file', files[i]);
        }
        data.append('name', name);
        data.append('importanceName', importanceName);
        data.append('description', description);
        data.append('userID', (window.localStorage.userid * 1));
        data.append('stateID', stateID);
        data.append('organizationID', orgID);
        data.append('firstname', firstname);
        data.append('phone', phone);
        data.append('createDate', new Date());
        axios.post('http://172.16.226.57:8080/api/addUserReq', data)
        .then((response) => {
          toast.success('Амжилттай хадгалагдлаа');
          submitHandler(response.data)
        })
        setTimeout(() => history.push('/userReqs'), 2000)
    };
    const onInputChange = (e) => {
      setFiles(e.target.files)
    };
    return (
        <>
        <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler} encType="multipart/form-data">
        <h2 className="content-title">Ажил даалгавар нэмэх</h2>
        <br/>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="userReq_name" className="form-label">
                      Ажил даалгаврын нэр
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="userReq_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  <div className="mb-6">
                    <label htmlFor="userReq_importance" className="form-label">
                      Ажлын төрөл
                    </label>
                    <select
                      className="form-select"
                      id="user_importance"
                      onChange={(e) =>setImportanceName(e.target.value)}
                    >
                      <option value="">Сонгох</option>
                      {arr1.map(impData => 
                        <option value={impData}>{impData}</option>
                      ) }
                      </select>
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                     <div className="mb-6">
                      <label htmlFor="userReq_file_id" className="form-label">
                        Файл 
                      </label>
                        <input
                        type="file"
                        onChange={onInputChange}
                        className="form-control"
                        multiple />
                        <div className="uploaded-files-list">
                        {uploadedFiles.map(file => (
                          <div>
                              {file.originalname}
                          </div>
                        ))}
                        </div>
                    </div>
                    {/* <div className="mb-12">
                        <label className="form-label" htmlFor="user_developerID">Гүйцэтгэгч </label>
                        <select className="form-select" id="user_developerID"
                          onChange = {(e) => { setFirstname(e.target.value)}}>
                          <option value="">Сонгох</option>
                            {arr0.map(userData => 
                            <option value={userData}>{userData}</option>) 
                          }
                        </select>   
                    </div>     */}
                    </div>
                  </div>
                  </div>
                  <div className="content-header">
                    <Link to="/userReqs" className="btn btn-danger text-white">
                      Буцах
                    </Link>
                      <button type="submit" className="btn btn-primary">
                      Хадгалах
                      </button>
                  </div>
              </div>

          </div>
        </div>
        </form>
      </section>  
        </>
      )
      };
     
export default CreateUserReq;

