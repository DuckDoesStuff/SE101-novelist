import React from "react";
import "./SignUpZone.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const SignUpZone = () => {
  return (
    
    <div className="SignUpZone">
        <img className="Greenlogo" src="/Greenlogo.svg" alt="Logo"></img>
        <div className="SignUpCard">
            <p className="titleBar">Sign up</p>
            <p className="text">Account </p>
            <div className="inputContainer">
            <div className="icon">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="text" className="inputField" placeholder="User Name" />
            </div>
            <p className="text">Password </p>
            <div className="inputContainer">
            <div className="icon">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <input type="text" className="inputField" placeholder="Password" />
            </div>
            <p className="text">Confirm your password </p>
            <div className="inputContainer" style={{marginLeft:'35px'}}>
            <input type="text" className="inputField" placeholder="Password" />
            </div>
            <button className="btn">Sign up</button>
            <button className="btn">Already have an account?</button>
      </div>
    </div>
  );
};

export default SignUpZone;
