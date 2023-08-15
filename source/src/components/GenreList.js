import React from "react";

const GenreList = () => {
  const genreListContainerStyle = {
    position: "fixed",
    top: "70px", // Đặt ở dưới nút "Genre"
    left: "136px",
    width: "200px", // Đặt chiều rộng cho khung chứa
    backgroundColor: "var(--background-02)", // Màu nền
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng đổ
    padding: "10px", // Khoảng cách viền nội dung
    zIndex:"1000",
  };

  const genreListStyle = {
    border: "0px none",
    height: "36px",
    width: "100%", // Để nút dài hết chiều rộng của container
    backgroundColor: "var(--background-01)",
    color: "var(--text)",
    fontWeight: "bold",
    borderRadius: "5%",
    marginBottom: "10px", // Thêm khoảng cách dưới nút
  };

  return (
    <div style={genreListContainerStyle}>
      <button style={genreListStyle}>Action</button>
      <button style={genreListStyle}>Comedy</button>
      <button style={genreListStyle}>Romance</button>
      <button style={genreListStyle}>Horror</button>
      <button style={genreListStyle}>Thriller</button>
      <button style={genreListStyle}>Detective</button>
      <button style={genreListStyle}>Slice of life</button>
      <button style={genreListStyle}>School</button>
    </div>
  );
};

export default GenreList;
