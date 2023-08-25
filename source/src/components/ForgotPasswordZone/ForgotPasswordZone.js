import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPasswordZone.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLock} from "@fortawesome/free-solid-svg-icons";

import { message } from "antd";
import { auth } from "../../backend-api/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotZone() {
    const [isChecked, setIsChecked] = useState(false);
    
    const [messageApi, notificationHolder] = message.useMessage();
    
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

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
    

    const handleSend = async (e) =>{
        e.preventDefault();
        console.log(email);
        sendPasswordResetEmail(auth, email)
        .then((user) => {
            uploadMessage("Check your email","success",2)
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
      <div className="ForgotZone" >
        {notificationHolder}
        <img className="Greenlogo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="ForgotCard">
            <p className="titleBar">Reset Password</p>
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
            
            <div style={{marginLeft:"35px", marginTop:"5px",marginBottom:"30px"}}>
            
            
            </div>

               <Link to =""><button className="btnSign" onClick={handleSend}>Send to email new password </button></Link> 
               <p style={{marginLeft:"auto",marginRight:"auto",fontStyle:"italic"}}>Remember your password ? </p>
               <Link to ="/signin"> <button className="btnSign">Sign In</button></Link> 


        </div>
            
      </div>
    );
  }
  
  export default ForgotZone;
  