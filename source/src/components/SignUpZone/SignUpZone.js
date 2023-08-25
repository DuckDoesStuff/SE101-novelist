import "./SignUpZone.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
// import { createUser } from "../../backend-api/AuthAPI";
// import { signup } from "../../backend-api/API";
import { message } from "antd";
import { auth } from "../../backend-api/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";



function SignUpZone() {
    
    const [messageApi, notificationHolder] = message.useMessage();
    
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        if (confirmpass!=password){
            uploadMessage("Your confirm password and password are not the same","error",2)
            return;
        }
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            uploadMessage("The user has been created successfully","success",2)
        })
        .catch((error) => {
            console.log(error.code)
            var message = "Something wrong, please try again", type = "error", duration = 2;
            if(error.code === 'auth/weak-password'){
                message = "Your password weak like Navi, use stronger password (at least 6 character)";
            }
            else if (error.code === 'auth/email-already-in-use'){
                message = "This email is used, check again"
            }

            uploadMessage(message, type, duration);

            // uploadMessage(error, "error", 2);
        })

    };
    return (
      <div className="SignUpZone" >
        {notificationHolder}
        <img className="Greenlogo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="SignUpCard">
            <p className="titleBar">Sign up</p>
            <p className="text">Account </p>
           <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faUser} /></div>
                <input 
                    type="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    placeholder=" Email.."
                    className="inputField"/>
            </div>
            <p className="text">Password </p>
            <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faLock} /></div>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" Password.."
                    className="inputField"
                 />
            </div>
            <p className="text">Comfirm your password </p>
            <input
                    type="password"
                    value={confirmpass} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="inputField"
                    placeholder="Password.."
                    style={{marginLeft:"36px"}}
            />
                <Link to =""><button className="Signbtn" onClick={handleSignUp}>Sign up</button></Link>
                <Link to ="/signin"><button className="Signbtn"> Already have account?</button>  </Link>
      </div>
    </div>
  );
};

export default SignUpZone;
