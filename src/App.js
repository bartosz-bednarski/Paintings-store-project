import React, { Fragment } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";

function App() {
  return (
    <Fragment>
      <Header></Header>
      <Slider />
    </Fragment>
  );
}
export default App;
