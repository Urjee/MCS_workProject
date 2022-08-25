import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";

import logo from "../img/mcs.png";
const Login = ({ history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      window.localStorage.setItem("userid", userInfo.UserID);
      window.localStorage.setItem("headid", userInfo.headID);
      console.log(userInfo.UserID)
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return ( 
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
            <img
              src={logo}
              className="logo1"
              alt="mcs logo"
            />
            <br/>        
          <h4 className="card-title mb-4 text-center">Нэвтрэх хэсэг</h4>
          {/* <h6 className="card-body mb-4 text-center">Хэрэглэгчийн эрхээр нэвтэрнэ.</h6> */}
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Нэвтрэх нэр"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Нууц үг"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Нэвтрэх
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
