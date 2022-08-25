import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./img/mcs.png";

const SidebarList = () => {
    const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

    const isAdmin = userinfo.isAdmin;

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
              {/* <li className="menu-item">
              { isAdmin !== 3 ? null : <NavLink
                activeClassName="active"
                className="menu-link"
                to="/workUser"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Ажил даалгавар</span>
              </NavLink>
              }
            </li> */}
            <li className="menu-item">
              { isAdmin !== 3 ? null : <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Хэрэглэгч</span>
              </NavLink>
              }
            </li> 
            <li className="menu-item">
            {/* { isAdmin == 2 ? null:  */}
             <NavLink
                activeClassName="active"
                className="menu-link"
                to="/userReqs"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Ажлын хүсэлт</span>
              </NavLink>
                          
            </li>   
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>            
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/report"
              >
                <i className="icon fas fa-list"></i>
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

export default SidebarList;
