import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignInZone.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLock} from "@fortawesome/free-solid-svg-icons";

function SignInZone() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    return (
      <div className="SignInZone" >
        <img className="Greenlogo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="SignInCard">
            <p className="titleBar">Sign in</p>
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
            <div style={{marginLeft:"35px", marginTop:"5px",marginBottom:"30px"}}>
            <input
                type="checkbox"
                id="remember"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label htmlFor="remember" >Remember me</label>
                <Link to="/signup" style={{marginLeft:"280px",fontStyle:"italic"}}>Forgot password?</Link>
            </div>
                <button className="btn">Log in</button>
                <button className="btn">Sign Up</button>


        </div>
            
      </div>
    );
  }
  
  export default SignInZone;
  