import React from "react";
import "./Footer.css";
import myData from "../DataInfo/companyInfo.json";

function Footer() {
  return (
    <div className="footerComponent">
      <div className="footerSection">
        <span className="footerHead">COMPANY</span>
        <span className="footerDetail">About Us</span>
      </div>
      <div className="footerSection">
        <span className="footerHead">CUSTOMER SERVICES</span>
        <span className="footerDetail">Customer Service</span>
        <span className="footerDetail">Give Us Feedback</span>
      </div>
      <div className="footerSection">
        <span className="footerHead">CONTACT US</span>
        <span className="footerDetail">
          Phone Details: {myData.companyDetails.phone}
        </span>
        <span className="footerDetail">
          Address: {myData.companyDetails.companyNameAccronym},{" "}
          {myData.companyDetails.city}
        </span>
      </div>
    </div>
  );
}

export default Footer;
