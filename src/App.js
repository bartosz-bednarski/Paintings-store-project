import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Shop from "./components/shop/Shop";
import RegisterForm from "./components/header/RegisterForm";
import LoginForm from "./components/header/LoginForm";
import RegisterContext from "./store/register-context";
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

  const consoleLogHandler = () => {
    console.log(registeredUsers);
  };

  const registeredUsersReducer = (state, action) => {
    return { response: action.response };
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
  }
  //Display login/register form
  return (
    <Fragment>
      <RegisterContext.Provider
        value={{
          registrationData: addRegisteredUserHandler,
          registeredUsersData: registeredUsers,
        }}
      >
        {loginFormIsShown && <LoginForm onClose={hideLoginForm} />}
        {registerFormIsShown && <RegisterForm onClose={hideRegisterForm} />}
        <Header
          onShowloginForm={showLoginForm}
          onShowRegisterForm={showRegisterForm}
        ></Header>
      </RegisterContext.Provider>
      <Slider />
      <button onClick={consoleLogHandler}>Check console log</button>
      <Shop />
    </Fragment>
  );
}
export default App;
