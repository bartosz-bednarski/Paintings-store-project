import React, { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Shop from "./components/shop/Shop";
import RegisterForm from "./components/header/RegisterForm";
function App() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };
  return (
    <Fragment>
      {modalIsShown && <RegisterForm onClose={hideModalHandler} />}
      <Header onShowModalHandler={showModalHandler}></Header>
      <Slider />
      <Shop />
    </Fragment>
  );
}
export default App;
