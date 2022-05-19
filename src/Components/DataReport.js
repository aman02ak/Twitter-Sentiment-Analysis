import React, { useState, useEffect } from "react";
import "./DataReport.css";
import Header from "./Header";
import DisplayChart from "./DisplayChart";
import AboutPOC from "./AboutPOC";
import Button from "react-bootstrap/Button";
import myData from "../DataInfo/companyInfo.json";

export default function DataReport() {
  document.title = "Test POC";
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export function PreFeededDataReport() {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modelName, setModelName] = useState("NB Multinomial TF/IDF + SMOTE");
  const [chartData, setChartData] = useState();
  const [chartType, setChartType] = useState("Bar");

  document.title = "Test Report POC";

  useEffect(() => {
    fetch("/api/perfeededData", { method: "GET" })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          setErrorStatus(true);
          setLoading(false);
        }
      })
      .then((data) => {
        setData(data);
        setChartData(data.retObjMLNaiveByesTFIDFSmoteLemma);
        setLoading(false);
      });
  }, []);

  // console.log(data);
  // console.log(chartData);
  return (
    <div>
      <Header text={"Report On Pre-Feeded Data"} />
      {loading ? (
        <>
          <h1 style={{ marginLeft: "25px" }}>Predicting...</h1>
          <h2 style={{ marginLeft: "25px" }}>Please Wait!!</h2>
          <div className="formData">
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          <h2 style={{ marginLeft: "25px" }}>Select Model</h2>
          <a
            href="/"
            style={{ float: "right", marginRight: "50px", fontStyle: "" }}
            // onclick={() => (window.location.href = "/")}
          >
            <Button variant="primary">Home</Button>
          </a>
          <ul style={{ marginLeft: "25px", cursor: "pointer" }}>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByes);
                setModelName("NB Multinomial");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDF);
                setModelName("NB Multinomial TF/IDF");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDFSmote);
                setModelName("NB Multinomial TF/IDF + SMOTE");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF + SMOTE)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDFSmoteLemma);
                setModelName("NB Multinomial TF/IDF + SMOTE + Lemmatization");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF + SMOTE + Lemmatization)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLSVMTFIDFSmoteLemma);
                setModelName("SVM TF/IDF + SMOTE + Lemmatization");
                setChartType("Bar");
              }}
            >
              SVM (TF/IDF + SMOTE + Lemmatization)
            </li>
            <li
              onClick={() => {
                setChartData(data);
                setModelName("Variation Over All Prediction");
                setChartType("Line");
              }}
            >
              Variation Over All Prediction
            </li>
          </ul>
          <DisplayChart
            modelName={modelName}
            chartData={chartData}
            chartType={chartType}
          />
        </>
      )}
    </div>
  );
}

export function TestDataReport() {
  const [filePath, setFilePath] = useState();
  const [fileExtension, setFileExtension] = useState(true);
  document.title = "Test Report POC";

  //////////////////////////////////////
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modelName, setModelName] = useState("NB Multinomial TF/IDF + SMOTE");
  const [chartData, setChartData] = useState();
  const [chartType, setChartType] = useState("Bar");

  const data1 = new FormData();
  const validiteFormat = async (e) => {
    var fPath = e.target.value;
    data1.append("file_from_ui", e.target.files[0]);

    setFilePath(e.target.value);
    var arr1 = new Array();
    arr1 = fPath.split("\\");
    var len = arr1.length;
    var file1 = arr1[len - 1];
    var filext = file1.substring(file1.lastIndexOf(".") + 1);
    // console.log(filext);
    if (filext == "csv" || filext == "xlsx") {
      setFileExtension(true);
    } else {
      setFileExtension(false);
    }
  };

  ////////////////////////////////////////////////
  function predictValue(fPath) {
    setLoading(true);
    console.log(data1);
    const requestOptions = {
      method: "POST",
      body: data1,
    };

    fetch("/api/perfeededData", requestOptions)
      .then((response) => {
        if (response.ok) return response.json();
        else {
          setErrorStatus(true);
          setLoading(false);
        }
      })
      .then((data) => {
        setData(data);
        setChartData(data.retObjMLNaiveByesTFIDFSmoteLemma);
        setLoading(false);
      });
  }
  console.log(data1);
  //////////////////////////////////////

  return (
    <div>
      <Header text={"Report On Test Data"} />

      {loading ? (
        <>
          <h1 style={{ marginLeft: "25px" }}>Predicting...</h1>
          <h2 style={{ marginLeft: "25px" }}>Please Wait!!</h2>
          <div className="formData">
            <div className="loader"></div>
          </div>
        </>
      ) : null}

      {!loading && data ? (
        <>
          <h2 style={{ marginLeft: "25px" }}>Select Model</h2>
          <a
            href="/"
            style={{ float: "right", marginRight: "50px", fontStyle: "" }}
          >
            <Button variant="primary">Home</Button>
          </a>
          <ul style={{ marginLeft: "25px", cursor: "pointer" }}>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByes);
                setModelName("NB Multinomial");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDF);
                setModelName("NB Multinomial TF/IDF");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDFSmote);
                setModelName("NB Multinomial TF/IDF + SMOTE");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF + SMOTE)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLNaiveByesTFIDFSmoteLemma);
                setModelName("NB Multinomial TF/IDF + SMOTE + Lemmatization");
                setChartType("Bar");
              }}
            >
              Naive Bayes Multinomial (TF/IDF + SMOTE + Lemmatization)
            </li>
            <li
              onClick={() => {
                setChartData(data.retObjMLSVMTFIDFSmoteLemma);
                setModelName("SVM TF/IDF + SMOTE + Lemmatization");
                setChartType("Bar");
              }}
            >
              SVM (TF/IDF + SMOTE + Lemmatization)
            </li>
            <li
              onClick={() => {
                setChartData(data);
                setModelName("Variation Over All Prediction");
                setChartType("Line");
              }}
            >
              Variation Over All Prediction
            </li>
          </ul>
          <DisplayChart
            modelName={modelName}
            chartData={chartData}
            chartType={chartType}
          />
        </>
      ) : null}
      {!loading && !data ? (
        <div className="formData">
          <form style={{ width: "300px" }}>
            <div>
              <label>Please select file . . .</label>
              <input
                type="file"
                className="form-control"
                id="inputFile"
                onChange={validiteFormat}
              />
              {!fileExtension ? (
                <div
                  style={{
                    color: "red",
                    opacity: 0.7,
                    float: "right",
                  }}
                >
                  *Please select right format excel file.
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={
                !fileExtension || !filePath ? { backgroundColor: "grey" } : null
              }
              disabled={!fileExtension || !filePath}
              onClick={() => predictValue(filePath)}
            >
              Predict
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export function About() {
  document.title = "About POC";
  return (
    <div>
      <Header text={"About POC"} />
      <a href="/" style={{ float: "right", margin: "50px", fontStyle: "" }}>
        <Button variant="primary">Home</Button>
      </a>
      <AboutPOC />
    </div>
  );
}

export function FutureScope() {
  document.title = "Future Scope POC";
  return (
    <div>
      <Header text={"Future Scope Of POC"} />
      <a href="/" style={{ float: "right", margin: "50px", fontStyle: "" }}>
        <Button variant="primary">Home</Button>
      </a>
      <div className="aboutPOC">
        {/* <h2>Title : {myData.aboutProject.title}</h2> */}
        <div>
          <h3>Future Objective</h3>
          <p>{myData.aboutProject.businessProblem}</p>
        </div>
        <div>
          <p>{myData.aboutProject.futureScope}</p>
        </div>
      </div>
    </div>
  );
}
