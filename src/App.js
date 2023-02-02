import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Shop from "./components/shop/Shop";
import RegisterForm from "./components/header/RegisterForm";
import LoginForm from "./components/header/LoginForm";
import RegisterContext from "./store/register-context";
import UserProfile from "./components/header/UserProfile";
import Admin from "./components/admin/Admin";
import PaintingsContext from "./store/paintings-context";
function App() {
  const [loginFormIsShown, setLoginFormIsShown] = useState(false);
  const [registerFormIsShown, setRegisterFormIsShown] = useState(false);
  const [userProfileIsShown, setUserProfileIsShown] = useState(false);
  const [paintingsData, setPaintingsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState({
    email: " ",
    isLoggedIn: false,
  });
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

  const showUserProfile = () => {
    setUserProfileIsShown(true);
  };
  const hideUserProfile = () => {
    setUserProfileIsShown(false);
  };

  //Not working

  const consoleLogHandler = () => {
    console.log(isLoggedIn);
    console.log(paintingsData);
  };

  const registeredUsersReducer = (state, action) => {
    return { response: action.response };
  };

  const isLoggedInHandler = (emailVal, isLoggedInVal) => {
    setIsLoggedIn({ email: emailVal, isLoggedIn: isLoggedInVal });
  };
  const [registeredUsers, dispatchRegisteredUsers] = useReducer(
    registeredUsersReducer,
    { response: [] }
  );

  const fetchUsersHandler = useCallback(async () => {
    const response = await fetch(
      "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const data = await response.json();
    console.log(data);
    // for (const key in data) {
    //   users.push({
    //     email: data[key].email,
    //     password: data[key].password,
    //   });
    // }
    dispatchRegisteredUsers({ response: data });
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  async function addRegisteredUserHandler(registrationData) {
    const response = await fetch(
      "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify(registrationData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchUsersHandler();
  }

  const getStoreDataHandler = useCallback(async () => {
    const response = await fetch(
      "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app/store.json"
    );
    const data = await response.json();
    console.log(data);
    // for (const key in data) {
    //   users.push({
    //     email: data[key].email,
    //     password: data[key].password,
    //   });
    // }
    const loadedData = [];

    for (const key in data) {
      loadedData.push({
        id: key,
        price: data[key].price,
        name: data[key].name,
        description: data[key].description,
        type: data[key].type,
        image: data[key].image,
        theme: data[key].theme,
      });
    }

    setPaintingsData(loadedData);
    //not working !!!
  }, []);
  useEffect(() => {
    getStoreDataHandler();
  }, []);
  //Display login/register form
  return (
    <PaintingsContext.Provider
      value={{
        getPaintings: getStoreDataHandler,
        paintings: paintingsData,
      }}
    >
      <RegisterContext.Provider
        value={{
          registrationData: addRegisteredUserHandler,
          registeredUsersData: registeredUsers,
          userIsLoggedInHandler: isLoggedInHandler,
          userIsLoggedIn: isLoggedIn,
        }}
      >
        {loginFormIsShown && <LoginForm onClose={hideLoginForm} />}
        {registerFormIsShown && <RegisterForm onClose={hideRegisterForm} />}
        {userProfileIsShown && <UserProfile onClose={hideUserProfile} />}
        <Header
          onShowloginForm={showLoginForm}
          onShowRegisterForm={showRegisterForm}
          onShowUserProfile={showUserProfile}
        ></Header>
      </RegisterContext.Provider>
      {isLoggedIn.email === "admin1234@gmail.com" && <Admin />}
      <Slider />
      <button onClick={consoleLogHandler}>Check console log</button>
      <Shop />
    </PaintingsContext.Provider>
  );
}
export default App;
