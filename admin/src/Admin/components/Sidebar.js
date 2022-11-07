import React from "react";
import SidebarUser from "../../User/SidebarUser";
import SidebarList from "./SidebarList";
import SidebarHead from "../../Head/SidebarHead";
import SidebarProgram from "./SidebarProgram";
const Sidebar = () => {

    const isAdmin = window.localStorage.isAdmin;
    const jobTitle = window.localStorage.jobTitle;
    // const [importanceID, setImportanceID] = useState();
    
    return (
      <div>
        
        { isAdmin === '1' && jobTitle === '1' && ( <SidebarList /> ) }

        { isAdmin === '1' && jobTitle === '0' && ( <SidebarProgram /> ) }

        {  isAdmin === '2' && ( <SidebarUser /> ) }

        {  isAdmin === '3' && ( <SidebarHead /> ) }
      </div>
    );
  };

export default Sidebar;
