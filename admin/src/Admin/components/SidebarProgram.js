import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/mcs.png";

const SidebarProgram = () => {

  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src={logo}
              style={{ height: "46" }}
              className="logo"
              alt="mcs logo"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Нүүр</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Хэрэглэгч</span>
              </NavLink>
            </li>  
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/requestProgrammer"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Ирсэн хүсэлтүүд</span>
              </NavLink>
            </li>     
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/adminReqsPro"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Ажил даалгавар</span>
              </NavLink>
            </li>

          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default SidebarProgram;
