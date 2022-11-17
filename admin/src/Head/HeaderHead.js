import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import logo from "./img/gamer.png";

const HeaderHead = () => {
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.assign('/login');

  };
  const firstname = window.localStorage.getItem("firstname");

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform">
          <datalist id="search_terms"></datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
            <img className="img-xs rounded-circle" src={logo} alt="User" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                <i className="icon fas fa-user"></i>
                {firstname}
              </Link>
              <Link className="dropdown-item" to="/settings">
                <i class="fa fa-cog" aria-hidden="true"></i>
                Тохиргоо
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Гарах
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderHead;
