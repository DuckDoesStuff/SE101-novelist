import React from "react";
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="SidebarContainer">
            <h3>Novelist</h3>
            <ul className="SidebarItems">
                <li className="SidebarItem active">Genres</li>
                <li className="SidebarItem">Novels</li>
                <li className="SidebarItem">Users</li>
                <li className="SidebarItem">Themes</li>
                <li className="SidebarItem">Maintenance notification</li>
            </ul>
        </div>
    );
};

export default Sidebar