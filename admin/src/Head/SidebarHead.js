import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./img/mcs.png";

const SidebarHead = () => {
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
                to="/headUser"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Хэрэглэгч</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/headReqs"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Ажлын хүсэлт</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/headReport"
              >
                <i className="icon fas fa-file"></i>
                <span className="text">Тайлан</span>
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

export default SidebarHead;
