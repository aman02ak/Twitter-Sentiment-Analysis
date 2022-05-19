import React from "react";
import "./DisplayChart.css";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(...registerables);

function DisplayChart(props) {
  const chartDataForBar = {
    labels: ["Negative", "Positive", "Neutral"],
    datasets: [
      {
        label: props.modelName,
        data: props.chartData,
        backgroundColor: ["aqua", "orange", "red"],
        borderColor: ["aqua", "green", "red"],
        borderWidth: 0.9,
      },
    ],
  };

  const chartDataForLine = {
    labels: ["Negative", "Positive", "Neutral"],
    datasets: [
      {
        label: "NB Multinomial",
        data: props.chartData.retObjMLNaiveByes,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "NB Multinomial (TF/IDF)",
        data: props.chartData.retObjMLNaiveByesTFIDF,
        fill: false,
        borderColor: "#802788",
      },
      {
        label: "NB Multinomial (TF/IDF + SMOTE)",
        data: props.chartData.retObjMLNaiveByesTFIDFSmote,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "NB Multinomial (TF/IDF + SMOTE + Lemmatization)",
        data: props.chartData.retObjMLNaiveByesTFIDFSmoteLemma,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "SVM (TF/IDF + SMOTE + Lemmatization)",
        data: props.chartData.retObjMLSVMTFIDFSmoteLemma,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div className="displayChart" style={{ width: "600px", height: "300px" }}>
      {props.chartType == "Bar" ? (
        <Bar
          data={chartDataForBar}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontSize: 5,
              },
            },
          }}
        />
      ) : null}
      {props.chartType == "Line" ? (
        <Bar
          data={chartDataForLine}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontSize: 5,
              },
            },
          }}
        />
      ) : null}
    </div>
  );
}

export default DisplayChart;
