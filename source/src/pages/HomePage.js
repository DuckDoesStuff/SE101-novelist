import React from 'react';
import Header from '../components/Header/Header.js';
import { auth } from '../backend-api/FirebaseConfig.js';

function HomePage() {
  auth.onAuthStateChanged((user) => {
    if (user) {
        // Người dùng đã đăng nhập, thực hiện hành động tương ứng
        console.log("Người dùng đã đăng nhập:", user.email);

        // Lưu thông tin đăng nhập vào Local Storage
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        // Người dùng chưa đăng nhập, yêu cầu đăng nhập hoặc điều hướng đến trang đăng nhập
        console.log("Người dùng chưa đăng nhập.");

        // Xóa thông tin đăng nhập khỏi Local Storage
        localStorage.removeItem("user");
    }
});
  return (
    // <div //data-theme={isDark ? 'dark' : 'light'}>
    <div>
    <Header/>
    {/* <div id="resultDiv"></div> */}
  </div>
    
    );
  
}
export default HomePage;