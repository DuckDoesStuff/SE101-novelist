// import React, { useState } from "react";
// import { createUser } from "../../backend-api/AuthAPI";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     try {
//       await createUser(email, password);
//       // Đăng ký thành công, thực hiện các hành động tiếp theo (ví dụ: chuyển hướng)
//     } catch (error) {
//       setError(error.message);
//     }
//   };

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

// export default SignUp;