import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bottom-0">
      <footer className="p-10 bg-gray-800 mt-10 w-full">
        <div className="flex flex-col justify-center items-center">
          <a href="/">
            <img src={logo} className="h-15" />
          </a>
          <p> &#169;Copyright. All Rights are Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
