import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignInZone.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLock} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthContext"; // Đường dẫn đến file AuthContext.js

import { message } from "antd";
import { auth } from "../../backend-api/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInZone() {
    const { isSignedIn, setIsSignedIn } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    
    const [messageApi, notificationHolder] = message.useMessage();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const uploadMessage = (content, type, duration) => {
        messageApi.destroy();
        messageApi.open({
          content: content,
          type: type,
          duration: duration,
          style: {
            marginTop: '20px auto',
          }
        })
      }
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    function nothing(){
      uploadMessage("Login succesfully","success",2);
    }
    const handleSignIn = async (e) =>{
        e.preventDefault();
        // console.log(email,password);
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(nothing(), 100000);
            window.location.href = "/homepage";
        })
        .catch((error) => {
            console.log(error.code)
            var message = "Something wrong, please try again", type = "error", duration = 2;
            if(error.code === 'auth/wrong-password'){
                message = "Your password is wrong, try again! Are you forgot your password ????";
            }
            else if (error.code === 'auth/user-not-found'){
                message = "User not found, check the email again if it correct"
            }
            else if (error.code === 'auth/invalid-email'){
                message = "The email is invalid, please check and try again"
            }
            uploadMessage(message, type, duration);
        })

    };
    return (
      <div className="SignInZone" >
        {notificationHolder}
        <img className="Greenlogo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="SignInCard">
            <p className="titleBar">Sign in</p>
            <p className="text">Account </p>
           <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faUser} /></div>
                <input
                    type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="inputField"
                    placeholder="Email"
                />
            </div>
            <p className="text">Password </p>
            <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faLock} /></div>
                <input
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
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
                <Link to="/forgot" style={{marginLeft:"280px",fontStyle:"italic"}}>Forgot password?</Link>
            </div>
               {/* <Link to ="/homepage"> */}
                  <button className="btnSign" onClick={handleSignIn}>Log in</button>
                {/* </Link>  */}
               <Link to ="/signup"> <button className="btnSign">Sign Up</button></Link> 
        </div>
      </div>
    );
  }
  
  export default SignInZone;
  