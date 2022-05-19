import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import {
  DataReport,
  PreFeededDataReport,
  TestDataReport,
  About,
  FutureScope,
} from "./Components/DataReport";

function App() {
  return (
    <div className="App">
      <div className="Section">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/preFeededData"
              element={<PreFeededDataReport />}
            ></Route>
            <Route path="/testData" element={<TestDataReport />}></Route>
            <Route path="/futureScope" element={<FutureScope />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <div className="Footer">
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default App;
