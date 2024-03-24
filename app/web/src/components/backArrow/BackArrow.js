// BackArrow.jsx
import React from "react";
import "./backArrow.css";

const BackArrow = ({ onClick }) => (
  <div onClick={onClick} className={"BackArrowWindow"}>
    ←
  </div>
);

export default BackArrow;
