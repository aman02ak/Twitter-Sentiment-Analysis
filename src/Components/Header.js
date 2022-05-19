import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="headerParent">
      <h1 className="header">{props.text}</h1>
    </div>
  );
}

export default Header;
