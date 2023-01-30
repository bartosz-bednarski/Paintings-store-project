import classes from "./RegisterForm.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import RegisterContext from "../../store/register-context";
const LoginForm = (props) => {
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
        props.onClose();
        console.log("correct password and email");
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
      <form onSubmit={submitHandler}>
        <div className={classes["registerForm-container"]}>
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
          <button>Login</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
