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

  const emailIsValidHanlder = (emailValue) => {
    for (const key in usersData) {
      if (usersData[key].email === emailValue) {
        console.log("correct");
      } else {
        console.log("wrong");
      }
      if (
        usersData[key].email === emailValue &&
        usersData[key].password === passwordValue
      ) {
        setLoginIsValid({ email: emailValue, isValid: true });
        console.log("correct password and email");
      } else {
        console.log("incorrect password or email");
      }
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailValue);
    console.log(passwordValue);
    console.log(ctx.registeredUsersData.response);
    emailIsValidHanlder(emailValue);
    console.log(loginIsValid);
  };
  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <div className={classes["registerForm-container"]}>
          <label htmlFor="e-mail">E-mail</label>
          <input type="text" id="e-mail" onChange={emailChangeHandler} />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" onChange={passwordChangeHandler} />
          <button>Login</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
