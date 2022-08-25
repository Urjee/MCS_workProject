import React from "react";
import MainUser from "../../User/MainUser";
import SidebarList from "./SidebarList";
import MainHead from "../../Head/MainHead";
const Sidebar = () => {
  // const { admin }= props;
    // let isAdmin = false;
    const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

    const isAdmin = userinfo.isAdmin;

    // if(userinfo.isAdmin === 1) {
    //   isAdmin = true;
    // }

  return (
    <div>
       { isAdmin === 1 && <SidebarList/>}
       { isAdmin === 2 && <MainUser/>}
       { isAdmin === 3 && <MainHead/>}
   

    {/* {admin ? (
      <SidebarList admin={admin} />
    ) : (
      <MainUser admin={admin} />
    )} */}
 </div>
  );
};

export default Sidebar;
