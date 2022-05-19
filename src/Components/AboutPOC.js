import { React, useState, useEffect } from "react";
import myData from "../DataInfo/companyInfo.json";

function AboutPOC() {
  const [data, setData] = useState();

  console.log(myData);

  return (
    <div className="aboutPOC">
      {/* <h2>Title : {myData.aboutProject.title}</h2> */}
      <div>
        <h3>Problem Statement</h3>
        <p>{myData.aboutProject.businessProblem}</p>
      </div>
      <div>
        <h3>About Dataset</h3>
        <p>
          Our Model is trained on this dataset. {myData.aboutProject.theData}
        </p>
      </div>
    </div>
  );
}

export default AboutPOC;
