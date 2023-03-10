import classes from "./Authentication.module.css";
import Modal from "../../UI/Modal";
import { useContext, useState } from "react";
import RegisterContext from "../../../store/register-context";
import Button from "../../UI/Button";
const Login = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginIsValid, setLoginIsValid] = useState({
    email: "",
    isValid: false,
  });
  const ctx = useContext(RegisterContext);
  const usersData = ctx.registeredUsersData.response;

  const emailChangeHandler = (event) => {
    setEmailValue(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPasswordValue(event.target.value);
  };
  const [warningMessage, setWarningMessage] = useState({
    type: "WARNING_MESSAGE",
    value: " ",
    isValid: false,
  });
  const emailIsValidHanlder = (emailValue) => {
    for (const key in usersData) {
      if (
        usersData[key].email === emailValue &&
        usersData[key].password === passwordValue
      ) {
        setLoginIsValid({ email: emailValue, isValid: true });
        ctx.userIsLoggedInHandler(emailValue, true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", emailValue);
        props.onClose();
      } else if (usersData[key].email !== emailValue) {
        setWarningMessage({
          type: "WARNING_MESSAGE_EMAIL",
          value: "Wrong e-mail.",
          isValid: true,
        });
      } else if (usersData[key].password !== passwordValue) {
        setWarningMessage({
          type: "WARNING_MESSAGE_PASSWORD",
          value: "Wrong password.",
          isValid: true,
        });
      }
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    emailIsValidHanlder(emailValue);
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["registerForm-container"]}>
        <form onSubmit={submitHandler}>
          <div className={classes["registerForm-box"]}>
            <label htmlFor="e-mail">E-mail</label>
            <input type="email" id="e-mail" onChange={emailChangeHandler} />
            {warningMessage.type === "WARNING_MESSAGE_EMAIL" && (
              <p>{warningMessage.value}</p>
            )}
            <label htmlFor="password">Password</label>
            <input type="text" id="password" onChange={passwordChangeHandler} />
            {warningMessage.type === "WARNING_MESSAGE_PASSWORD" && (
              <p>{warningMessage.value}</p>
            )}
            <Button>Login</Button>
          </div>
        </form>
        <p
          onClick={props.onShowRegisterForm}
          className={classes["register-paragraph"]}
        >
          Don't have an account? Create it for free.
        </p>
      </div>
    </Modal>
  );
};

export default Login;
