// text.jsx
import React from "react";
import "./text.css";

const Text = ({ content, className }) => {
    return <div className={`${className}`}>{content}</div>;
  };

export default Text;
