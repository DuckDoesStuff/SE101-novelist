// import React from "react";
import "./SignUpZone.css"
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLock} from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
// import { createUser } from "../../backend-api/AuthAPI";
import { signup } from "../../backend-api/API";
import { auth } from "../../backend-api/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// const SignUp = () => {
  

//   return (
//     <div>
//       <h2>Đăng ký</h2>
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSignUp}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Mật khẩu:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Đăng ký</button>
//       </form>
//     </div>
//   );
// };


function SignUpZone() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            // The user has been created successfully
            console.log(user)
        })
        .catch((error) => {
            // Cry
            console.log(error)
        })


        // console.log(email);
        // try {
        //     // const result = await signup(email, password);

        //     // Đăng ký thành công, thực hiện các hành động tiếp theo (ví dụ: chuyển hướng)
        // } catch (resultMessage) {
        //     console.log(resultMessage)
        //     setError(resultMessage);
        //     console.log(error)
        // }
    };
    return (
      <div className="SignUpZone" >
        <img className="logo" src="/Greenlogo.svg" alt="Logo" ></img>
        <div className="SignUpCard">
            <p className="title">Sign up</p>
            <p className="text">Account </p>
           <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faUser} /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <p className="text">Password </p>
            <div className="inputContainer"> 
                <div className="icon">
                <FontAwesomeIcon icon={faLock} /></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <p className="text">Comfirm your password </p>
            <input
                    type="text"
                    className="inputField"
                    placeholder="Password"
                    style={{marginLeft:"50px"}}
            />
            <div>
                <button className="btn" onClick={handleSignUp}>Sign up</button>
                <Link to = "/signin">
                    <button className="btn">Already have account?</button>
                </Link>
            </div>
        </div>
            
      </div>
    );
  }
  
  export default SignUpZone;
  