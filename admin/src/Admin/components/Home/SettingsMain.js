import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const SettingsMain = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [UserID, setUserID] = useState();
  const history = useHistory();
  const toastId = React.useRef(null);
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;
 
  useEffect(() => {
    setFirstname(window.localStorage.getItem("firstname"));
    setLastname(window.localStorage.getItem("lastname"));
    setEmail(window.localStorage.getItem("email"));
    setPhone(window.localStorage.getItem("phone"));
    setUserID(window.localStorage.getItem("userid"));
  }, []);

  const submitHandler = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Нууц үг таарахгүй байна. Дахин оруулна уу", ToastObjects);
      }
    } else {
    await axios.post('http://172.16.226.57:8080/api/settingsUpdate',
      {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password,
        UserID: UserID,
        confirmPassword: confirmPassword,
      }
    ) 
    setTimeout(() => history.push('/'), 2000)
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Амжилттай хадгалагдлаа", ToastObjects);
    }
  }
  }; 
  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <>     
     <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
        <h2 className="content-title">Хэрэглэгчийн мэдээлэл</h2>
        <br/>
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-3">
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
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label for="account-pass" className="form-label">
                      Нууц үг солих
                    </label>
                    <input
                    placeholder="Нууц үгээ оруулна уу"
                      className="form-control"
                      value={password}
                      id="passwordInput"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    /> 
                    <i className="far fa-eye" id="togglePassword"></i>
                  </div>
                  <div className="col-mb-6">
                    <label for="account-confirm-pass" className="form-label">
                      Нууц үг баталгаажуулах
                    </label>
                    <input
                      placeholder="Нууц үгээ баталгаажуулна уу"
                      type="password"
                      id="passwordInput"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />       
                      <i className="far fa-eye password-icon" id="togglePassword"></i>
                  </div>               
              <div>
              <br/>  
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
  );
};

export default SettingsMain;
