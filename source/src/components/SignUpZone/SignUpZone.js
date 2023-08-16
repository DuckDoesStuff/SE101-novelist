import React from "react";
import "./SignUpZone.css"
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLock} from "@fortawesome/free-solid-svg-icons";

function SignUpZone() {
    return (
      <div className="SignUpZone" >
        <img className="logo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="SignUpCard">
            <p className="title">Sign up</p>
            <p className="text">Account </p>
           <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faUser} /></div>
                <input
                    type="text"
                    className="inputField"
                    placeholder="User Name"
                />
            </div>
            <p className="text">Password </p>
            <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faLock} /></div>
                <input
                    type="text"
                    className="inputField"
                    placeholder="Password"
                />
            </div>
            <p className="text">Comfirm your password </p>
            <input
                    type="text"
                    className="inputField"
                    placeholder="Password"
                    style={{marginLeft:"50px"}}
            />
            <div>
                <button className="btn">Sign up</button>
                <Link to = "/signin">
                    <button className="btn">Already have account?</button>
                </Link>
            </div>
        </div>
            
      </div>
    );
  }
  
  export default SignUpZone;
  