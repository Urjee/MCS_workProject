import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import axios  from "axios";
import { USERREQ_CREATE_RESET } from "../../Redux/Constants/requestConstants";

const ReqDetails = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const searchString = new URLSearchParams(window.location.search);
    const [impName, setImpName] = useState("");
    const [importanceName, setImportanceName] = useState("");
    const [stateName, setStateName] = useState("");
    const [stteName, setStteName] = useState("");
    const [file_name, setFileName] = useState([]);
    const [files, setFiles] = useState([]);
    const[file_id, setFileID] = useState();
    const imprts=[];
    const states = [];
    const [deleteVal, setDeleteVal] =useState([]);
    const [fileRemove, setFileRemove] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [createDate, setCreateDate] = useState();
    const history = useHistory();

    const dispatch = useDispatch();
    const userReqCreate=useSelector((state)=>state.userReqCreate);
    const {loading, error, requests}=userReqCreate;

    const reqID = searchString.get("id")

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
    states.forEach(i=> {
      states.push(i.stateName)
    });
    const handleDownload = () => {
      axios({
        url: `http://172.16.226.57:8080/images/${file_name}`,
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
    useEffect(() => {
      if(requests){
        dispatch({type: USERREQ_CREATE_RESET})
          setName("");
          setDescription("");
          setImportanceName(imprts);
          setStateName(states);
          setCreateDate(createDate);
          setFileName(file_name);
      }
    },[requests, dispatch]);
    
  const submitHandler= (e)=>{
    e.preventDefault();  
       axios.post('http://172.16.226.57:8080/api/userReqsUpdate',
       { name: name,
        description: description,
        importanceName: importanceName,
        file_id: file_id,
        userReqID: reqID })
      .then((response) => {
        toast.success('Амжилттай хадгалагдлаа');
        submitHandler(response.data)
      });
      setTimeout(() => history.push('/userReqs'), 2000)
  };

    useEffect(() => {
    const userid = () => {
       fetch('http://172.16.226.57:8080/api/headReqDetail', {
        method: "POST",
        body: 
          JSON.stringify({userReqID: reqID}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        setName(res[0].name)
        setDescription(res[0].description)
        setImportanceName(res[0].importanceName)
        setStateName(res[0].stateName)
        setFileName(res[0].file_name)
        setFileID(res[0].file_id)
        setCreateDate(res[0].createDate)
      })
      .catch(function (error){
        console.log(error);
      });
    };
    userid()
  }, [])  

  const handleDelete = (file_name) => {   
    setDeleteVal(file_name);
    setFileName([]);
    setFileRemove(true);
  }
  const fileButton = () => {
    window.open(`http://172.16.226.57:8080/images/${file_name}`, '_blank')
    history.push('/userReqs')
  }
  return (
  <>
  <Toast/>
  <section className="content-main">
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <div className="content-header">
            <h2 className="content-title">Ажил даалгаврын дэлгэрэнгүй</h2>        
                <div hidden>
                  <Link to="/" className="btn btn-second">
                      <i className="material-icons md-plus"></i> Дэд ажил нэмэх
                  </Link>
              </div> 
      </div>
        <div className="row">
        <div className="col lg-4">
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
                      className="form-control"
                      value={name}
                      onChange={(e) =>setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-12">
                      <label htmlFor="userReq_description" className="form-label">
                        Тайлбар
                      </label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    </div>
                    <br/>
                    <div className="mb-12">
                      <label htmlFor="userReq_importanceName" className="form-label">
                        Ажлын төрөл
                      </label>
                      <select type="text" value={importanceName} className="form-select"
                        onChange={(e) =>setImportanceName(e.target.value)}>
                            {arr1.map(impData => 
                          <option>{impData}</option>
                        ) }
                        </select>
                    </div>
                    { fileRemove ? null :
                      <div id="form-control" className="mb-12">
                      <i className="icon fas fa exit"></i>
                        <label id="input1label" htmlFor="fileName" className="form-label">
                          Файл
                        </label>
                        <button  onClick={() => fileButton('https://google.com')} className="form-control" value={file_name}>
                          <input 
                            value={file_name}
                            accept=".jpg,.jpeg,.png,.docx,.csv,.xslx,.pdf"
                            className="form-control"/>
                          </button>
                            <button hidden id="delX" onClick={()=>handleDelete(file_name)}>X</button>
                              <br/>
                            <button hidden id="download" className="btn btn-third cursor-pointer text-white" onClick={handleDownload}>
                                <i className="icon fas fa-download" id="download" />
                              Татаж авах 
                              </button>
                        </div>                 
                        }     
                      { fileRemove ? 
                        <div>
                        <label htmlFor="userReq_file_id" className="form-label" >
                          Файл оруулах
                        </label>
                        <input type="file" className="form-control"
                          multiple
                          onChange={(e) => setFiles(e.target.files)}
                        />
                        <div className="uploaded-files-list">
                          {uploadedFiles.map(file => (
                            <div>
                                {file.originalname}
                            </div>
                          ))}
                          </div>
                        </div> : null
                        }
                        <br/>
                  <div className="content-header">
                      <Link to="/userReqs" className="btn btn-dark col-3">
                        Буцах
                      </Link>
                      <button type="submit" className="btn btn-success col-3">
                          Хадгалах
                      </button>
                  </div>
                </div>
              </div>
        </div>
        <div className="col-lg-4">
        <div hidden className="card card-body mb-12 shadow-sm">
          <article className="icontext">
            
            <div className="text">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="fas fa-file-download"></i>
            </span>
            <i hidden></i>Файл харах
            {/* <StyledDiv className="App">
              <StyledDiv className="input-wrapper">
                <StyledInput type="file" onChange={handleFile} />
                
                <StyledButton
                  type="button"
                  onClick={() => togglePreview(!showPreview)}
                  disabled={file ? false : true}
                >
                  Preview
                </StyledButton>
              </StyledDiv>
              <StyledDiv>
                {file && showPreview && (
                  <FilePreview file={file} onClose={() => togglePreview(false)} />
                )}
              </StyledDiv>
              </StyledDiv> */}
              {/* <img
              src={`http://172.16.226.57:8080/images/${file_name}`}
              // style={{ height: "22" }}
              className="phot"
              alt=""
            /> */}
              </div>
      
          </article>
        </div>
      </div>
      </div>
    </form> 
  </section>
  </>

  );
          };

export default ReqDetails;
