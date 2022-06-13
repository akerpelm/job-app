import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => alert("toggle sidebar")}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
