import classes from "./RegisterForm.module.css";
import Modal from "../UI/Modal";
import { useContext, useEffect, useReducer, useState } from "react";
import RegisterContext from "../../store/register-context";
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
  const { value: emailValue } = emailState;

  const [emailIsUnique, setEmailIsUnique] = useState(false);
  const ctx = useContext(RegisterContext);
  const usersData = ctx.registeredUsersData.response;
  //after passing same e-mail, then backspace and writing again the same email it accepts the values. This has to be fixed !!!
  useEffect(() => {
    for (const key in usersData) {
      if (usersData[key].email === emailValue) {
        console.log("emailisNOTUnique");
        console.log(usersData);
        setEmailIsUnique(false);
      } else {
        setEmailIsUnique(true);
      }
    }
    setFormIsValid(
      passwordValue === passwordConfirmValue &&
        passwordIsValid &&
        passwordConfirmIsValid &&
        emailIsValid &&
        emailIsUnique === true
    );
  }, [
    passwordValue,
    passwordConfirmValue,
    passwordIsValid,
    passwordConfirmIsValid,
    emailIsValid,
    emailValue,
    setEmailIsUnique,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      email: emailValue,
      password: passwordValue,
    };
    if (formIsValid === true) {
      setWarningMessage({ isValid: false });
      ctx.registrationData(userData);
      props.onClose();
    } else if (emailIsUnique === false) {
      setWarningMessage({
        type: "WARNING_MESSAGE_DUPLICATED_EMAIL",
        value: "Account on this e-mail already exists.",
        isValid: true,
      });
    } else if (passwordValue !== passwordConfirmValue) {
      setWarningMessage({
        type: "WARNING_MESSAGE_DIFFERENT PASSWORDS",
        value: "Your passwords are different.",
        isValid: true,
      });
    } else if (passwordIsValid || passwordConfirmIsValid === false) {
      setWarningMessage({
        type: "WARNING_MESSAGE_TOO_SHORT_PASSWORD",
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
          {warningMessage.type === "WARNING_MESSAGE_DIFFERENT PASSWORDS" && (
            <p>{warningMessage.value}</p>
          )}
          {warningMessage.type === "WARNING_MESSAGE_TOO_SHORT_PASSWORD" && (
            <p>{warningMessage.value}</p>
          )}
          {warningMessage.type === "WARNING_MESSAGE_DUPLICATED_EMAIL" && (
            <p>{warningMessage.value}</p>
          )}
          <button>Register</button>
        </div>
      </form>
    </Modal>
  );
};
export default RegisterForm;
