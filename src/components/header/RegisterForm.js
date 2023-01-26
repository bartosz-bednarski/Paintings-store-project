import classes from "./RegisterForm.module.css";
import Modal from "../UI/Modal";
import { useEffect, useReducer, useState } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5,
    };
  }
};

const passwordConfirmReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
};

const RegisterForm = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const [passwordConfirmState, dispatchPasswordConfirm] = useReducer(
    passwordConfirmReducer,
    {
      value: "",
      isValid: false,
    }
  );

  const [formIsValid, setFormIsValid] = useState(false);
  const [warningMessage, setWarningMessage] = useState({
    type: "WARNING_MESSAGE",
    value: "",
    isValid: false,
  });
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordConfirmChangeHandler = (event) => {
    dispatchPasswordConfirm({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };
  //Validation

  const { value: passwordValue } = passwordState;
  const { isValid: passwordIsValid } = passwordState;
  const { value: passwordConfirmValue } = passwordConfirmState;
  const { isValid: passwordConfirmIsValid } = passwordConfirmState;
  const { isValid: emailIsValid } = emailState;

  useEffect(() => {
    setFormIsValid(
      passwordValue === passwordConfirmValue &&
        passwordIsValid &&
        passwordConfirmIsValid &&
        emailIsValid
    );
  }, [
    passwordValue,
    passwordConfirmValue,
    passwordIsValid,
    passwordConfirmIsValid,
    emailIsValid,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid === true) {
      setWarningMessage({ isValid: false });
      console.log("correct");
    } else if (passwordValue !== passwordConfirmValue) {
      setWarningMessage({
        type: "WARNING_MESSAGE",
        value: "Your passwords are different.",
        isValid: true,
      });
    } else if (passwordIsValid || passwordConfirmIsValid === false) {
      setWarningMessage({
        type: "WARNING_MESSAGE",
        value: "One of your passwords is too short.",
        isValid: true,
      });
    }
  };
  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <div className={classes["registerForm-container"]}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" onChange={emailChangeHandler} />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" onChange={passwordChangeHandler} />
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            type="text"
            id="passwordConfirm"
            onChange={passwordConfirmChangeHandler}
          />
          <button>Register</button>
          {warningMessage.isValid && <h2>{warningMessage.value}</h2>}
        </div>
      </form>
    </Modal>
  );
};
export default RegisterForm;
