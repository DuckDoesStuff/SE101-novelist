// import React, { useState } from "react";
// import { UserAuth } from "../auth/authContext";

// function SignIn() {
//   const { logIn } = UserAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await logIn(email, password);
//       // Đăng nhập thành công, thực hiện các hành động khác (ví dụ: điều hướng đến trang chính)
//     } catch (error) {
//       console.log(error);
//       // Xử lý lỗi đăng nhập (ví dụ: hiển thị thông báo lỗi cho người dùng)
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;
import React, { useState, useEffect } from "react";
import { message } from "antd";
import Button from "../components/Button/Button";
import { signInWithEmailAndPassword } from "../backend-api/AuthAPI";
import "../styles/SignInPage.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [messageApi, notificationHolder] = message.useMessage();

  const handleSignIn = () => {
    var message = "", type = "error", duration = 2;
    if (!email || !password) {
      message = "Please enter your email and password";
    } else {
      message = "Signing in";
      type = "loading";
    }
    uploadMessage(message, type, duration);

    if (type === "loading") {
      signInWithEmailAndPassword(email, password)
        .then(() => {
          // Handle successful sign-in
          uploadMessage("Sign-in successful", "success", duration);
        })
        .catch((error) => {
          // Handle sign-in error
          uploadMessage(error.message, "error", duration);
        });
    }
  };

  const uploadMessage = (content, type, duration) => {
    messageApi.destroy();
    messageApi.open({
      content: content,
      type: type,
      duration: duration,
      style: {
        marginTop: '20px',
      }
    });
  };

  return (
    <div className="sign-in-page">
      {notificationHolder}
      <div className="sign-in-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button children="Sign In" onClick={handleSignIn} />
      </div>
    </div>
  );
};

export default SignInPage;