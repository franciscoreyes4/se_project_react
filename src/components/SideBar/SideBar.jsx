import React from "react";
import avatar from "../../assets/avatar.png"; 
import "./SideBar.css";

function SideBar() {
    return (
        <section className="sidebar"> 
            <img src={avatar} alt="avatar" className="sidebar__avatar" />
            <p className="sidebar__username">Terrence Tegegne</p>
        </section>
    )
}

export default SideBar;
