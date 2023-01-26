import React, { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Shop from "./components/shop/Shop";
import RegisterForm from "./components/header/RegisterForm";
import LoginForm from "./components/header/LoginForm";
function App() {
  const [loginFormIsShown, setLoginFormIsShown] = useState(false);
  const [registerFormIsShown, setRegisterFormIsShown] = useState(false);
  //Display login/register form
  const showLoginForm = () => {
    setLoginFormIsShown(true);
  };

  const hideLoginForm = () => {
    setLoginFormIsShown(false);
  };
  const showRegisterForm = () => {
    setRegisterFormIsShown(true);
  };
  const hideRegisterForm = () => {
    setRegisterFormIsShown(false);
  };
  //Display login/register form
  return (
    <Fragment>
      {loginFormIsShown && <LoginForm onClose={hideLoginForm} />}
      {registerFormIsShown && <RegisterForm onClose={hideRegisterForm} />}
      <Header
        onShowloginForm={showLoginForm}
        onShowRegisterForm={showRegisterForm}
      ></Header>
      <Slider />
      <Shop />
    </Fragment>
  );
}
export default App;
