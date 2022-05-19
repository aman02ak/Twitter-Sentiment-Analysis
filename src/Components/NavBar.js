import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./NavBar.css";
import Header from "./Header";

function NavBar() {
  document.title = "Home";
  return (
    <div className="navBarDesign">
      <Header />
      <span>
        <span></span>
      </span>
      <div className="wrap">
        <a href="/about">
          <div></div>
        </a>
        <a href="/preFeededData">
          <div></div>
        </a>

        <a href="/testData">
          <div></div>
        </a>

        <a href="/futureScope">
          <div></div>
        </a>
        <a></a>
      </div>
    </div>
  );
}

export default NavBar;
