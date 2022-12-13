import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import axios  from "axios";

const ReqAdminEdit = () => {
    const [name, setName] = useState("");
    const [impName, setImpName] = useState("");
    const [importanceName, setImportanceName] = useState("");
    const imprts=[];
    const [planTime, setPlanTime] = useState('');
    const [file_name, setFileName] = useState([]);
    const [file, setFile] = useState([]);
    const [description, setDescription] = useState("");
    const [stateName, setStateName] = useState("");
    const [stteName, setStteName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [DeveloperID, setDeveloperID] = useState();
    const [percentOfPerform, setPercentOfperform] = useState();
    const [firstname, setFirstname] = useState("");
    const searchString = new URLSearchParams(window.location.search);
    const [fileRemove, setFileRemove] = useState(false);
    const reqID = searchString.get("id")
    const requestCreate = useSelector((state) => state.requestCreate);
    const { loading, error } = requestCreate;
    const [stateID, setStateID] = useState();
    const [developerName, setDeveloperName]= useState("");
    const history = useHistory();
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onInputChange = (e) => {
      setFiles(e.target.files)
    };
    useEffect(()=> {
      const impName=()=>{
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
    imprts.forEach(i=> {
      imprts.push(i.importanceName)
    });

    useEffect(()=> {
      const stteName = () => {
        fetch('http://172.16.226.57:8080/api/state')
        .then(res => res.json())
        .then(stateData => setStteName(stateData));
      }
      stteName()
    }, [])
    let arr2=[];
    for(let i in stteName) {
      arr2.push(stteName[i].stateName)
    }   
    useEffect(() => {
      const developerName = () => {
      fetch('http://172.16.226.57:8080/api/developer')
      .then(res => res.json())
      .then(devData => setDeveloperName(devData));
      }
      developerName()
    }, [])

    let arr0 = [];
    for(let i in developerName) {
      arr0.push(developerName[i].firstname)
    } 
    const realTime = ((new Date(endDate).getTime() - new Date(startDate).getTime()) /1000/60/60);

    const submitHandler = (e) =>{   
      e.preventDefault();
      const data = new FormData();
        for(let i=0; i < files.length; i++) {
          data.append('file', files[i]);
        }
        data.append('planTime', planTime);
        data.append('realTime', realTime);
        data.append('startDate', startDate);
        data.append('endDate', endDate);
        data.append('percentOfPerform', percentOfPerform);
        data.append('stateID', stateID);
        data.append('stateName', stateName);
        data.append('firstname', firstname);
        data.append('DeveloperID', DeveloperID);
        data.append('userReqID', reqID)
        axios.put('http://172.16.226.57:8080/api/requestAdminUpdate', data)
        .then((response) => {
        toast.success('Амжилттай хадгалагдлаа');
        submitHandler(response.data)
      });
      setTimeout(() => history.push('/adminReqs'), 2000)
    };
    const arr = []
    useEffect(() => {
    const userid = () => {
       fetch('http://172.16.226.57:8080/api/reqAdminEdit', {
        method: "POST",
        body: 
          JSON.stringify({userReqID: reqID}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        setName(res[0][0].name)
        setImportanceName(res[0][0].importanceName)
        setPlanTime(res[0][0].planTime)
        setDescription(res[0][0].description)
        setStateName(res[0][0].stateName)
        setFirstname(res[0][0].firstname)
        setStartDate(res[0][0].startDate)
        setEndDate(res[0][0].endDate)
        setDeveloperID(res[0][0].DeveloperID)
        setPercentOfperform(res[0][0].percentOfPerform)   
        setStateID(res[0][0].stateID) 
        setFileRemove(res[0][0].fileRemove)

        setFile(res[0])
        for(let i = 0; i < res[0].length; i++) {
          setFileName(res[0][i].file_name);
          arr.push(res[0][i].file_name)
        };
      })
      .catch(function (error){
        console.log(error);
      });
    };
    userid()
  }, [])  
  console.log(file)
  const handleDownload = () => {
    axios({
      url: `c`,
      method: "GET",
      headers: {
        "Accept": "application/json", 
        "Content-Type": "multipart/form-data"
      },
      responseType: "blob" 
  }).then((response )=> {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
          'download',file_name);
      document.body.appendChild(link);
      link.click();
  }) 
}
  const fileButton = () => {
    window.open(`http://172.16.226.57:8080/images/${file_name}`, '_blank')
    history.push('/adminReqs')
  }
  return (
  <>
  <Toast/>
  <section className="content-main">
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <div className="content-header">
            <h2 className="content-title">Ажил даалгаврын дэлгэрэнгүй</h2>        
      </div>
      <div className="row mb-2">
          <div className="col-xl-8 col-lg-12">
            <div className="card mb-6 shadow-sm">
              <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
                { loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="userReq_name" className="form-label">
                      Ажил даалгаврын нэр
                    </label>
                    <input type="text" className="form-control" value={name} 
                      onChange={(e) =>setName} />
                  </div>
                  <div className="mb-12">
                    <label htmlFor="userReq_importanceName" className="form-label">
                      Чухал байдал
                    </label>
                    <input type="text" value={importanceName} className="form-select"
                          onChange={(e) =>setImportanceName}>
                    </input>
                  </div>
                  <div className="mb-12">
                    <label htmlFor="userReq_stateName" className="form-label">
                      Төлөв
                    </label>
                    <select  value={stateName} className="form-select" 
                      onChange={(e) =>setStateName(e.target.value)}>
                        <option>{stateName}</option>
                        {arr2.map(stateData =>
                            <option value={stateData}>{stateData}</option>)}
                      </select>
                  </div>
                  
                    <div className="mb-12">
                       <label htmlFor="userReq_description" className="form-label">
                        Тайлбар
                       </label>
                    </div>
                        <input type="text" className="form-control" value={description}  
                          onChange={(e) => setDescription} /> 
                    <div className="mb-12">
                       <label htmlFor="userReq_planTime" className="form-label">
                         Төлөвлөгөөт хугацаа
                        </label>
                        <input className="form-control"  type ="datetime-local" value={planTime}
                        onChange = {(e) => setPlanTime(e.target.value)}/>                          
                    </div>
                     
                    <div className="mb-12">
                        <label>Эхэлсэн огноо</label>
                        <input type = "datetime-local" className="form-control" value={startDate}
                        onChange = {(e) => setStartDate(e.target.value)}/>   
                    </div>      
                    <div className="mb-12">
                        <label>Дуусах огноо</label>
                        <input type="datetime-local" className="form-control"  value={endDate}
                        onChange = {(e) => setEndDate(e.target.value)}/>   
                    </div>    
                    <div className="mb-12">
                       <label htmlFor="userReq_realTime" className="form-label">
                        Бодит цаг </label>
                        <input type="" className="form-control" value={realTime} />  
                      </div> 
                    <div className="mb-12">
                        <label htmlFor="userReq_firstname" className="form-label">
                          Гүйцэтгэгч 
                        </label>
                        <select  className="form-select" value ={firstname}
                          onChange = {(e) => setFirstname(e.target.value)}>
                            <option>{firstname}</option>
                            {
                              arr0.map(devData => 
                                <option value={devData}>{devData}</option>
                              )
                            }
                        </select>  
                    </div>   
                    
                    <div className="mb-12">
                        <label>Ажлын гүйцэтгэл</label>
                        <input type="text" className="form-control"
                        value={percentOfPerform}
                        onChange = {(e) => setPercentOfperform(e.target.value)} />   
                    </div>   
                    <div className="mb-12">
                       <label htmlFor="userReq_description" className="form-label">
                        Файл хавсаргах
                       </label>
                    </div>
                        <input type="file" name="file" onChange={onInputChange} className="form-control" multiple />
                        <div className="uploaded-files-list">
                            {uploadedFiles.map(file => (
                              <div>
                                  {file.originalname}
                              </div>
                            ))}
                        </div>
                        <br/>
                    { fileRemove ? null :
                    <div id="form-control" className="mb-12">
                      <i className="icon fas fa exit"></i>
                      <label id="input1label" htmlFor="fileName" z="form-label">
                        Хавсаргасан файл
                      </label>
                            {
                              file.map((file) => 
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
                        <br/>
                        <button hidden id="download" className="btn btn-third cursor-pointer text-white" onClick={handleDownload}>
                            <i className="icon fas fa-download" id="download" />
                          Татаж авах 
                        </button>
                      </div>   
                      }   
                     
                      <br/>
                <div className="content-header">
                    <Link to="/adminReqs" className="btn btn-dark col-3">
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

export default ReqAdminEdit;
