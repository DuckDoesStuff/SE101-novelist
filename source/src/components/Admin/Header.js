import React from "react";
import './Header.css';

const Header = () => {
    return (
        <div className="HeaderContainer">
            <img src="/logo.svg" alt ="logo"/>
            <div className="btnContainerAdmin">
                <i class="fa-solid fa-user"></i>
            </div>
        </div>
    )
};

export default Header